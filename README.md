# GeoFlow: OGC API Workflow Builder

GeoFlow is a web-based, drag-and-drop workflow builder designed to simplify complex spatial analyses. It provides a visual canvas where users can connect Open Geospatial Consortium (OGC) API data inputs (Features, Coverages) to processing nodes, and executes them via a Django backend.

## Features
* **Visual Canvas:** Drag and drop OGC processes to build spatial workflows.
* **JSON Orchestration:** Automatically converts visual nodes into executable JSON payloads.
* **Backend Execution:** Django backend routes requests to 52°North OGC APIs and handles asynchronous job execution.

## Tech Stack
* **Frontend:** Vanilla JavaScript, HTML5, CSS3 
* **Backend:** Python 3, Django, Django REST Framework
* **APIs:** OGC API - Processes, Features

## Setup Instructions
1. Clone the repository: `git clone https://github.com/yourusername/geoflow-ogc-builder.git`
2. Navigate to the directory: `cd geoflow-ogc-builder`
3. Create a virtual environment: `python -m venv venv`
4. Activate the environment and install dependencies: `pip install -r requirements.txt`
5. Run migrations: `python manage.py migrate`
6. Start the server: `python manage.py runserver`
7. Access the builder at `http://localhost:8000/static/index.html`