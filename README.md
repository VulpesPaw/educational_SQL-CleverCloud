# SQL CleverCloud

## Background

A small educational project for MySQL connected to CleverCloud.

## Purpose

This project uses Node.JS as a back-end API which in turn communicates and stores SQL-items in CleverCloud.

The interface used for the project is an API handler, in this case it's Postman.

## Features

- The web application features API routes, and at most returns only raw json data. 
- The API includes full CRUD implementation.

- The API features general security practices to avoid SQL injections.

eg. utilizing ``?`` in queries to constrain user inputs
````MySQL
let query = `
        INSERT INTO quotes
        (title, quote, author, description, img)
        VALUES (?,?,?,?,?);
    `;
````


The back-end does not feature best-practices such as serialization etc. as it is not directly related to the project at hand.

## Notes

This project was built purely for educational and documentational purposes
