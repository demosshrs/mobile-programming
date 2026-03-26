1. GET & SET
      - When "Show Name" is clicked, GET the text from #student-name
        and display it in #output using .text()
      - When "Change Name" is clicked, SET #student-name text to your own name
      - When "Show Bio" is clicked, GET the HTML from #student-bio
        and display it in #output using .text()
      - When "Get Input" is clicked, GET the value from #nickname-input
        and display it in #output using .val()
      - When "Set Input" is clicked, SET the value of #nickname-input to "jQuery Pro"

   2. CSS CLASSES
      - When "Highlight Card" is clicked, ADD the class "highlighted" to #profile-card
      - When "Remove Highlight" is clicked, REMOVE the class "highlighted" from #profile-card
      - When "Toggle Dark Mode" is clicked, TOGGLE the class "dark-mode" on #profile-card
      - When "Toggle Rounded" is clicked, TOGGLE the class "rounded" on #profile-photo

   3. CSS METHOD
      - When "Red Background" is clicked, use .css() to change #profile-card background to #e74c3c
      - When "Reset Background" is clicked, use .css() to change it back to white

   4. HIDE & SHOW
      - When "Hide Photo" is clicked, HIDE #profile-photo using .hide("slow")
      - When "Show Photo" is clicked, SHOW #profile-photo using .show("slow")
      - When "Toggle Bio" is clicked, TOGGLE #student-bio using .toggle()

   5. FADE
      - When "Fade Out Card" is clicked, FADE OUT #profile-card
      - When "Fade In Card" is clicked, FADE IN #profile-card
      - When "Fade to 50%" is clicked, use .fadeTo() to set #profile-card opacity to 0.5

   6. SLIDE
      - When "Slide Up Skills" is clicked, SLIDE UP #skills-list
      - When "Slide Down Skills" is clicked, SLIDE DOWN #skills-list
      - When "Slide Toggle Skills" is clicked, SLIDE TOGGLE #skills-list

   7. ANIMATE
      - When "Animate Card" is clicked, animate #profile-card:
          → margin-left to 200px (in 1 second)
          → then back to 0px (in 1 second)  (use chaining!)

   8. EVENTS
      - When mouse HOVERS over #profile-photo:
          → mouseenter: add class "shadow" to #profile-photo
          → mouseleave: remove class "shadow" from #profile-photo
      - When a key is pressed in #nickname-input:
          → display the pressed key in #output