package server

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

var albums = []album{
	{ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

func getContainers(c *gin.Context, cli *client.Client, ctx context.Context) {
	containers, err := cli.ContainerList(ctx, container.ListOptions{})
	if err != nil {
		panic(err)
	}

	for _, ctr := range containers {
		fmt.Printf("%s %s\n", ctr.ID, ctr.Image)
	}

	c.JSON(http.StatusOK, containers)
}

func getEvents(c *gin.Context, cli *client.Client, ctx context.Context) {
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")

	eventOptions := types.EventsOptions{}

	events, errs := cli.Events(ctx, eventOptions)

	for {
		select {
		case event := <-events:
			eventJSON, err := json.Marshal(event)
			if err != nil {
				log.Println("Error marshaling Docker event:", err)
				continue
			}
			msg := fmt.Sprintf("%s: %s %s", event.Type, event.Action, event.Actor.Attributes["name"])
			println(msg)
			_, err = c.Writer.Write([]byte("event:message\n"))
			_, err = c.Writer.Write([]byte("data: "))
			_, err = c.Writer.Write(eventJSON)

			_, err = c.Writer.Write([]byte("\n\n"))
			if err != nil {
				fmt.Printf("%s", err)
				return
			}
			c.Writer.Flush()
			//c.SSEvent("message", eventJSON)
		case err := <-errs:
			if err != nil {
				log.Println("Error streaming Docker events:", err)
			}
			return
		}
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func Start() {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		// Handle error initializing Docker client
		panic(err)
	}

	router := gin.Default()
	router.Use(CORSMiddleware())
	router.GET("/", func(c *gin.Context) { getContainers(c, cli, ctx) })
	router.GET("/albums", getAlbums)
	router.GET("/events", func(c *gin.Context) {
		getEvents(c, cli, ctx)
	})

	err = router.Run("localhost:8080")
	if err != nil {
		return
	}

}
