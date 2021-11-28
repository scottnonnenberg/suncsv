# suncsv

Generates sunrise and sunset calendar items in CSV form for import to your favorite calendar program.

## Setup

First, install the project globally:

```bash
npm install -g suncsv
```

## Usage

To get a CSV with sunrise/sunset events from now until the end of this year:

```bash
suncsv -z YOURZIP > events.csv
```

To get it for next year, you can specify your begin and end dates:

```bash
suncsv -z YOURZIP --begin '2015-01-01' --end '2015-12-31' > events.csv
```

## Add to Google Calendar

Now that you've got your `events.csv` file, you can import it into your favorite calendar program. __Google Calendar__ makes it really easy. We can even create a new calendar just for these items:

* Click on the little down arrow beside __My Calendars__
* Select __Create new calendar__

Once you've created your calendar and are back on the main screen, let's import the events:

* Click on the little down arrow beside __Other calendars__
* Select __Import calendar__
* Click __Choose File__ and find your newly-generated `events.csv`
* Now select the calendar you just created for the new items
* Click __Import__!

That should do it! You've got sunrise and sunset times you can easily turn on and off by toggling your new sub-calendar.

Enjoy!

## License

(The MIT License)

Copyright (c) 2013 Scott Nonnenberg &lt;scott@nonnenberg.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
