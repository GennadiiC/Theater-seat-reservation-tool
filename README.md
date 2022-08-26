Imagine a theater with 127 seats.

It is is divided into several sections (e.g. auditorium, box left 1, balcony-mid, etc.) Two seats are considered adjacent if they are in the same row and in the same section, and they are next to each other.

First input parameter includes the number of currently reserved seats. It must amount to at least 20% of the total number of seats. After receiving it, the seats are reserved in a random order.
Second parameter includes the number of visitors for whom we are searching adjacent seats (minimum 2, maximum 8 - with only even numbers accepted). 

The app finds the best available alternative. 

The higher price category a seat belongs to the better its location is. 

If two seats fall in the same price category, the order of section preference prevails: The most popular section is the Auditorium, then the Balcony-mid, followed by the left and right balconies (identical preference) and lastly, the boxes (identical preference).

In the event two or more seats are in the same section and in the same price category, the one(s) in the row closer to the stage is (are) considered better.
If two or more seats are in the same row, the one(s) in the centre is (are) preferred. 

Once you start, you'd see an input which receives the number of currently reserved seats. It accepts numbers in range from 43 (which is 20% of all seats) - to 209 (which is 8 seats less of total amount of seats)

After you submit an input parameter, you'll see the second input, as well as data about booked seats and free seats. As previously mentioned, the second input accepts the number of visitors for whom we are searching adjacent seats (minimum 2, maximum 8 - with only even numbers accepted). Submit this number and - voola! see the best adjacent pairs options available from free seats :)



