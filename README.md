dojo-typescript-class
=====================

This is an experiment aimed at using TypeScript to create Dojo classes. There
have been several attempts by different people already. This attempt aims at
making the creation of Dojo classes from TypeScript as comfortable as possible
with the minimum of weird code duplication and pitfalls.

The magic is in dojoClass.js and for examples of usage see
MyTSDojoBaseClass.ts and MyTSDojoSubclass.ts. The idea is to create classes
using the normal TypeScript/ES6 syntax, then to pass that prototype object
to Dojo's declare() function to create the Dojo class, and then merge the
interesting bits in the Dojo class back into the TypeScript one.

Running the unit tests
======================

There are a couple of steps needed to run the tests for this code.

* Run 'npn install'
* Go to http://dojotoolkit.org/download/ and download the source zip and
  unzip it under the lib/ directory. (You may have to pop open test.html
  and adjust the requirejs config.)
* Execute either make.bat or make.sh .
* Open test.html in a browser.

Improvements and more tests are welcome.

--
cheers,
Simon
