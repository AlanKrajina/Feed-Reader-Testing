/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test looping through each feed ensuring URL is defined and URL is not empty
        it('URL feed is not empty', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            	expect(feed.url).toMatch("http");
            });	
        });

        // Test looping through allFeeds ensuring name is defined and name is not empty
         it('allFeeds name is defined and name is not empty', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            }); 
         });
    });

        // New test suite named "The menu" ensuring menu element is hidden by default
    describe('The menu', function(){
    	it('should be hidden by default', function(){
            expect($("body").hasClass("menu-hidden")).toBe(true);
    	});

        // This is a test that ensures the menu changes visibility when the menu icon is clicked.
        it('changes visibility on click', function() {
            // first click 
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // second click
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);  
            
        });
    });

    // This is a new test suite named "Initial Entries" that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
    describe("Initial Entries", function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it("should have at least one article when load feed", function(done) {
            expect($(".feed").find(".entry")[0]).toBeDefined();
            done();
        });
    });

    // Test that ensures when a new feed is loaded by the loadFeed function that the content changes.
    describe("New Feed Selection", function() {
        let title;
        beforeEach(function(done) {
          loadFeed(0, function() {
            title = document.querySelector(".header-title").innerHTML;
            loadFeed(1, function() {
              done();
            });
          });
        });

        it("changes its loaded content", function(done) {
          let newTitle = document.querySelector(".header-title").innerHTML;
          expect(title).not.toEqual(newTitle);
          done();
        });      
    });
}());
