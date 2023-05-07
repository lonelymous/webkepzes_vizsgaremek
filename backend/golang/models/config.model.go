package models

import (
	"strconv"

	"github.com/lonelymous/godab"
)

type ServerConfig struct {
	PortNumber     int
	DatabaseConfig godab.DatabaseConfig
}

func (this *ServerConfig) GetPort() string {
	return ":" + strconv.Itoa(this.PortNumber)
}
