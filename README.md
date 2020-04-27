## Setup

Copy and make changes to `.env.example`

```
cp .env.example .env
```

## Start

```
bin/start
```

## Misc

Sometimes you want to drop the table and start fresh. Get a docker console into the container and run:

```
cd src
npx sequelize-cli db:drop
```

## Notes

- had issues with timestamps being incorrect. tried some fixes with setting timezone via docker and locally in sequelize.
