# Golang-SvelteKit

This project is a personal proof of concept for creating a monorepo using yarn as the package manager.

## Description

This project contains a Go server that manages a connection to the host's docker socket and then exposes the data from a REST API using gin. The client in `apps/client` is a SvelteKit app that connects to the server's endpoints to display the running containers or a real-time event list.

## Getting Started

### Go Server

Use the `go` tools to compile and run `main.go`

### SvelteKit

Uses `yarn` as the package manager and workspaces.

Run `yarn workspace client dev` to start the development with Vite.
