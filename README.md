#release D
 * Add html5 canvase to home resource section
 * fully comment current code, including CSS
 * put mapping of partials in README for scss dir for each page

#TODO CONSIDERATIONS
 * refactor scss to scope animations to one partial
 * refactor site resources section to one partial

##Branch Naming Conventions
 * master - Contains the most stable recent version of the site
 * develop - Contains previous stable version of site merged with release plan's feature branches after QA passed
 * rel_[a-z] - Current release built from develop to ensure a clean and separate version history
 * rel_[a-z]/feature/ - Specific feature for the website ex. feature/top_navigation
 * defect/ - Defect branch to isolate and fix a specific issue
 * **HOTFIX BRANCHES ARE NOT EMPLOYED DUE TO THIS BEING A SINGLE DEV PERSONAL SITE**

##Dev Dependencies
 * HTML5
 * Javascript
 * SASS
 * Node.js
 * Gulp.js
 * Git, for versioning and githook deployments

##Code Commenting Conventions
 * TODO - Used for future intended feature or refactoring needs 
 * FIXME - Used for defect remediation in code only
 * (Styling) Table of Contents - A table of contents system is used for all SASS partials

##Intended Variations of Site
####Non-CMS Implementations
 * HTML/JS/SASS
 * HTML/ES6/LESS

####CMS Platform
 * Wordpress
 * More to come

##Browser Support
 * IE 9+
 * Safari
 * Chrome 
 * Firefox

##ADA Compliance level AAA