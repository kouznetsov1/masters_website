# TO-DO

- [] line-through courses
- [] graphical view

### How to represent a course when checkboxes are unique and courses are not

Courses are not unique in the sense that they appear in many different areas which in turn makes duplicates.

When a course is pressed (checkbox), then we want a line-through on thouse courses with the same course code that are in another semester/period/area.

How do we do this when we have courses in many different, unique tables?

For every course, have a list of all other courses checkbox statuses (of the same course code). And any of these objects update, then we should make a line-through.
Problem with this one is, how do we create this array of checkboxes? 

##### Structure

1. API, GET 
2. Walk through all the courses and add them to state
3. Go through every semester
	4. Go through every area
		5. Go through every period
			6. Print course row into table
			7. Every course that is in the correct semester, area and period gets written

...

### Graphical View

What's needed:
	1. graphical view of courses in blocks
	2. number of examinations for every type
	3. points accumulated for every area
	4. 
