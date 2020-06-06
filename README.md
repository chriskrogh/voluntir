# Voluntir
[Design doc](https://1drv.ms/w/s!Ajjz4Qsyp61wiJ4lNb14c-bkBlMljg)

Commit with completed auth: 67e575190734b401da654a7afb3bbad6f37d6c50

## Models

### Media
* event -> Event

### Event
* community -> Community
* attendees -> User[]

### Community
* admins -> User[]
* members -> User[]

### User
* followers -> User[]
* following -> User[]
