# AASTU CLINIC TODO

## FRONTEND

1. Create Sign up page
- Done but improve the styling
- add register date
2. Create login page
- Done but improve the styling 
- try dark mode
3. Work on the patient dashboard
4. work on the doctor dashboard
5. work on the admin dashboard

### Patient Dashboard
#### medical card page - 1st if no history
- `make it a component and use it in the patient dashboard`
- `create a form to add the medical card`
* `fields:- department, phone, gender, birthdate, bloodtype`


##### Medical card page 
- `get the contents from the database by calling the API to checkCard.php if success return the medical card page if not show the medical card page with a form to add the medical card`
- `send the data from sendCardInfo.php to MyMedicalCard.tsx and show the medical card page with the data from the database`
- `the data sent includes the following fields:`
  -` Full name, department, phone, email, bloodtype, age, gender, profile picture`

* `display the data in the medical card page`




- editing C
* show 
- in the backend check if the patient has a medical history or not if not show the medical card page if yes show the medical history page
#### appointment page - 2nd
- `make it a component and use it in the patient dashboard`
- `create a form to book an appointment with the doctor`
- `in the backend check if the patient has an appointment or not if not show the appointment page if yes show the appointment history page`
* create an api to send the form and get results from the database
* and when rescheduling the appointment use update in the backed



#### medical history page - 1st
- make it a component and use it in the patient dashboard
- if the patient has a medical history show the medical history page and add a button to go back to the medical card page


- `Create a nav bar with links to the following pages:`
  - `Home`
  - `About`
  - `Services`
  - `Contact us`
  - `Sign up`
  - `Login`
  - `Admin dashboard (only for admin)`

### Doctors dashboard 
- total patients treated
- total appointments
- appointment list that displays only the appointments for the doctor and to come
- patient info with the appointment list
- a button to add a medical record for a patient
- a modal for adding a medical record for a patient

## BACKEND
<!-- 1. Fix the database for the clinic -->
2. match the login and sign up correctly
3. work on the patient dashboard


``` javascript
create an interface for           $data['name'],
            $data['department'],
            $data['phone'],
            $data['email'],
            $data['bloodType'],
            $data['age'],
            $data['gender'],
            $data['profilePic'] in typescript

interface MedicalCard {
    name: string;
    department: string;
    phone: string;
    email: string;
    bloodType: string;
    age: string;
    gender: string;
    profilePic: string;
}

```

```php 

```