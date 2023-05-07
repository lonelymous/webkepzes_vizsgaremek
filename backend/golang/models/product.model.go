package models

type Product struct {
	Id          int     `json:"id" db:"Id"` // This is the primary key
	Name        string  `json:"name" db:"Name"`
	Description string  `json:"description" db:"Description"`
	Price       float64 `json:"price" db:"Price"`
	Quantity    int     `json:"quantity" db:"Quantity"`
}

type ProductEditor struct {
	Name        string  `json:"name" db:"Name"`
	Description string  `json:"description" db:"Description"`
	Price       float64 `json:"price" db:"Price"`
	Quantity    int     `json:"quantity" db:"Quantity"`
}
