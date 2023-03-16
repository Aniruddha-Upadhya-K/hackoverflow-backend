## Server File Structure

Server
    controllers
        user.controller(signin, signout, register)
        employee.experience.controller(allexpriences, newexperience, deleteexperience)
        company.experience.controller(approve, reject)

    databases
        dbconfig
        dbschema

    models
        user.model
        experience.model

    routers
        user.router
        experience.router

    utils
        auth
        passwords

    

### APIs and payloads

>Employee Login - {email/contact, password}
>Employee SignUp- {name, email, phone, password}
>New Experience- {companyName, Duration, position}
>DeleteExperience- {ExperienceID}
>New company register- {companyName, password}
>companyLogin- {companyID, password}
>Approve/Reject experience claim- {RequestID}
