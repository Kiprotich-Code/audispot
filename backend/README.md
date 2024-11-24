## Audispot - Backend
This is just a collection of REST API's built on Django REST Framework, to implement the business logic for the audispot website.

## Folder Structure
This is the current backend folder structure.
```
accounts: Custom app to handle user authentication and permissions.
backend: Default app which includes the standard Django settings.
api: Currently handles slider images for upload on audispot site.
```
## Getting Started
### Pre-requisites
- [Python](https://realpython.com/installing-python/)
- [Creating a Virtual Environment](https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/)

### Setup
Clone the repository
```sh
git clone 'repository-link'
```
Move into the backend folder
```sh
cd audispot/backend
```
Install requirements
```sh
pip install -r requirements.txt
```
Make migrations & migrate
```
python manage.py makemigration
```
```
python manage.py migrate
```

Start server
```
python manage.py runserver
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```



# API Testing & Use
1. Accounts
    
    ```bash
    routes:
        accounts
        accounts/login/
    ```

2. Slider Images 
- Slider Images are accessible through the 'api' route
```bash
    Default Route:
        /api/slider_images/ # This also lists all images [GET]
    
    Others:
        /api/slider_images/ # Upload a new image [POST]
        /api/slider_images/{id}/ # Retrieves Details Of an Image  [GET]
        /api/slider_images/{id} # Full update of image [PUT]
        /api/slider_images/{id} # Partial update of image [PATCH]
        /api/slider_images/{id} # Delete an image [DELETE]
```
## License
MIT
