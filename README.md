# Easy Nixie Momento Web

A web interface for controlling and configuring Nixie tube displays.

## Overview

This project provides a web-based frontend for interacting with Nixie tube displays. It allows users to configure and control Nixie tube displays through a simple and intuitive web interface.

## Features

- Web-based configuration interface
- Real-time display control
- Customizable settings via config.json

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the configuration template:
   ```
   cp config.json.template config.json
   ```
4. Edit `config.json` with your specific settings

## Usage

Start the application:

```
npm run dev
```

## Project Structure

- `index.html` - Main web interface
- `styles.css` - CSS styling for the web interface
- `app.js` - Main application logic
- `config.json.template` - Template for configuration