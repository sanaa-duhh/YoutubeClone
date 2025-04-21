// export const API_KEY = "AIzaSyCkYTO7Y-wROanr9YAwADHNt-A8qZUuUFg";   
// export const API_KEY = "AIzaSyB466iO_qA_oGK4Biw0ss3NDbkSCP0Vzx8";
   export const API_KEY = "AIzaSyCJbzCo7or4Z1jZKUruf6WnD4jFgSU5sVE";
export const value_converter = (value) => {
    if(value>=1000000)
    {
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000)
    {
        return Math.floor(value/1000)+"K";
    }
    else
    {
        return value;
    }
}