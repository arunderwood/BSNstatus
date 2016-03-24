function dodivRss() {
    $('#divRss').FeedEk({
        FeedUrl: 'https://github.com/arunderwood/BSNstatus/commits/master.atom',
        MaxCount: 2,
        DateFormat: 'MM-DD-YYYY'
    });
}
