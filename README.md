# Mini URLs for the Mabinogi community #
[MabiWorld](http://mabi.world) provides mini URLs for the greater Mabinogi community. Didn't know? Check it out [here](http://mabi.world/mini.php)!

This is the code to both make the URLs and perform the redirections. Currently this does not involve generating novel minified URLs, if you want that try [bitly](http://j.mp) or similar services.

This service, then, performs jumps based on existing identifiers so no URLs actually have to be generated and all existing pages* on supported websites automatically have a URL.
<br/>\*Note: Such pages must be part of a supported subsystem, too.

## How to register your site ##
1. First make sure your pages have a numerical identifier. Wikis' have to be retrieved from the API but most forums include it in the URL.
2. Then you can report in a ticket or make the changes yourself.
    * In a ticket you must report:
        1. What possible URLs there can be.
        2. How to retrieve the ID, what the ID is, etc.
        3. How to access the pages with only the ID.
    * If you do it yourself:
        1. You should make a URL identifier of the form `isSitenameSubsystem` where *Sitename* is the website name (or a reasonable shorthand) and *Subsystem* is what the set of pages represent, such as **Thread**.
        2. Then you should make a mini maker of the form `makeSitenameSubsystem` that calls a `setLink("x" + real2mini(ID))` where *x* is the one-character identifier for your website. It may be a letter or number and is case-sensitive; obviously it must also not already be in use.
        3. Lastly, add a check to the list in `minify`.
        4. Now make a pull request for your changes and we'll take a look!
3. Wait for us to deploy it, then you can add some code to show the links on your site.

