import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";

const DEFAULT_PROFILE = {
  name: "Lawrence",
  capId: "",
  squadron: "CAP Squadron",
  joined: "2026-06-01",
  goal: "Earn Wright Brothers Award"
};

const ACHIEVEMENTS = [
  {
    id: 1,
    name: "Curry Achievement",
    rank: "Cadet Airman",
    abbr: "C/Amn",
    phase: "Phase I",
    requirements: [
      "Be a current CAP cadet",
      "Recite the Cadet Oath",
      "Complete Cadet Welcome Course",
      "Complete Learn to Lead Chapter 1",
      "Attempt CPFT",
      "Participate in character development"
    ],
    drill: [
      "Fall In",
      "Attention",
      "Parade Rest",
      "Present Arms",
      "Order Arms",
      "Right Face",
      "Left Face",
      "About Face",
      "Forward March",
      "Flight Halt"
    ]
  },
  {
    id: 2,
    name: "Arnold Achievement",
    rank: "Cadet Airman First Class",
    abbr: "C/A1C",
    phase: "Phase I",
    requirements: [
      "Minimum 8 weeks after Curry",
      "Wear uniform properly",
      "Complete Learn to Lead Chapter 2",
      "Complete aerospace module",
      "Continue CPFT progress",
      "Attend character development"
    ],
    drill: [
      "All Curry drill",
      "Column Right",
      "Column Left",
      "To the Rear March",
      "Change Step March"
    ]
  },
  {
    id: 3,
    name: "Feik Achievement",
    rank: "Cadet Senior Airman",
    abbr: "C/SrA",
    phase: "Phase I",
    requirements: [
      "Minimum 8 weeks after Arnold",
      "Complete Learn to Lead Chapter 3",
      "Complete aerospace module",
      "Continue CPFT progress",
      "Attend character development"
    ],
    drill: [
      "All previous drill",
      "Open Ranks",
      "Close Ranks",
      "Count Off",
      "Dress Right Dress",
      "Ready Front"
    ]
  },
  {
    id: 4,
    name: "Wright Brothers Award",
    rank: "Cadet Staff Sergeant",
    abbr: "C/SSgt",
    phase: "Phase I Milestone",
    requirements: [
      "Minimum 8 weeks after Feik",
      "Pass Wright Brothers leadership exam",
      "Complete aerospace work",
      "Meet fitness requirement",
      "Complete drill evaluation"
    ],
    drill: [
      "Form the Flight",
      "Report to Commander",
      "Give Stationary Commands",
      "Give Marching Commands",
      "Lead Basic Flight Drill"
    ]
  },
  {
    id: 5,
    name: "Rickenbacker Achievement",
    rank: "Cadet Technical Sergeant",
    abbr: "C/TSgt",
    phase: "Phase II",
    requirements: [
      "Minimum 8 weeks after Wright Brothers",
      "Complete Learn to Lead Chapter 4",
      "Complete aerospace module",
      "Meet HFZ",
      "Attend character development"
    ],
    drill: ["NCO drill leadership", "Form and align flight"]
  },
  {
    id: 6,
    name: "Achievement 5",
    rank: "Cadet Master Sergeant",
    abbr: "C/MSgt",
    phase: "Phase II",
    requirements: [
      "Minimum 8 weeks after Rickenbacker",
      "Complete Learn to Lead Chapter 5",
      "Complete aerospace module",
      "Meet HFZ",
      "Attend character development"
    ],
    drill: ["Lead basic flight drill", "Mentor junior cadets"]
  },
  {
    id: 7,
    name: "Doolittle Achievement",
    rank: "Cadet Senior Master Sergeant",
    abbr: "C/SMSgt",
    phase: "Phase II",
    requirements: [
      "Minimum 8 weeks after Achievement 5",
      "Complete Learn to Lead Chapter 6",
      "Complete aerospace module",
      "Meet HFZ",
      "Attend character development"
    ],
    drill: ["Advanced NCO drill", "Correct junior cadet drill errors"]
  },
  {
    id: 8,
    name: "Goddard Achievement",
    rank: "Cadet Chief Master Sergeant",
    abbr: "C/CMSgt",
    phase: "Phase II",
    requirements: [
      "Minimum 8 weeks after Doolittle",
      "Complete Learn to Lead Chapter 7",
      "Complete aerospace module",
      "Meet HFZ",
      "Attend character development"
    ],
    drill: ["Senior NCO drill", "Teach facing and marching movements"]
  },
  {
    id: 9,
    name: "Armstrong Achievement",
    rank: "Cadet Chief Master Sergeant",
    abbr: "C/CMSgt",
    phase: "Phase II",
    requirements: [
      "Minimum 8 weeks after Goddard",
      "Complete Learn to Lead Chapter 8",
      "Complete aerospace module",
      "Meet HFZ",
      "Complete speech and essay"
    ],
    drill: ["Flight sergeant duties", "Mentor junior NCOs"]
  },
  {
    id: 10,
    name: "Billy Mitchell Award",
    rank: "Cadet Second Lieutenant",
    abbr: "C/2d Lt",
    phase: "Phase II Milestone",
    requirements: [
      "Minimum 8 weeks after Armstrong",
      "Pass Mitchell leadership exam",
      "Pass aerospace exam",
      "Meet HFZ",
      "Graduate encampment"
    ],
    drill: ["Master Phase II drill", "Prepare for officer leadership"]
  },
  {
    id: 11,
    name: "Achievement 9",
    rank: "Cadet Second Lieutenant",
    abbr: "C/2d Lt",
    phase: "Phase III",
    requirements: [
      "Minimum 8 weeks after Mitchell",
      "Complete Learn to Lead Chapter 9",
      "Complete SDA requirement",
      "Complete aerospace block test",
      "Meet HFZ"
    ],
    drill: ["No new drill test", "Teach junior cadets"]
  },
  {
    id: 12,
    name: "Willa Brown Achievement",
    rank: "Cadet First Lieutenant",
    abbr: "C/1st Lt",
    phase: "Phase III",
    requirements: [
      "Minimum 8 weeks after Achievement 9",
      "Complete Learn to Lead Chapter 10",
      "Complete SDA requirement",
      "Complete aerospace block test",
      "Meet HFZ"
    ],
    drill: ["No new drill test", "Supervise drill instruction"]
  },
  {
    id: 13,
    name: "Achievement 11",
    rank: "Cadet First Lieutenant",
    abbr: "C/1st Lt",
    phase: "Phase III",
    requirements: [
      "Minimum 8 weeks after Willa Brown",
      "Complete Learn to Lead Chapter 11",
      "Complete SDA requirement",
      "Complete aerospace block test",
      "Meet HFZ"
    ],
    drill: ["No new drill test", "Support ceremonies"]
  },
  {
    id: 14,
    name: "Amelia Earhart Award",
    rank: "Cadet Captain",
    abbr: "C/Capt",
    phase: "Phase III Milestone",
    requirements: [
      "Minimum 8 weeks after Achievement 11",
      "Pass Earhart leadership exam",
      "Meet HFZ",
      "Meet general advancement requirements"
    ],
    drill: ["No new drill test", "Mentor junior cadets"]
  },
  {
    id: 15,
    name: "Achievement 12",
    rank: "Cadet Captain",
    abbr: "C/Capt",
    phase: "Phase IV",
    requirements: [
      "Minimum 8 weeks after Earhart",
      "Complete Learn to Lead Chapter 12",
      "Complete SDA requirement",
      "Meet HFZ",
      "Attend character development"
    ],
    drill: ["No new drill test", "Oversee training"]
  },
  {
    id: 16,
    name: "Achievement 13",
    rank: "Cadet Captain",
    abbr: "C/Capt",
    phase: "Phase IV",
    requirements: [
      "Minimum 8 weeks after Achievement 12",
      "Complete Learn to Lead Chapter 13",
      "Complete SDA requirement",
      "Meet HFZ",
      "Attend character development"
    ],
    drill: ["No new drill test", "Mentor cadet officers and NCOs"]
  },
  {
    id: 17,
    name: "Boyd Achievement",
    rank: "Cadet Major",
    abbr: "C/Maj",
    phase: "Phase IV",
    requirements: [
      "Minimum 8 weeks after Achievement 13",
      "Complete Learn to Lead Chapter 14",
      "Complete SDA requirement",
      "Complete aerospace block test",
      "Meet HFZ"
    ],
    drill: ["No new drill test", "Supervise unit drill training"]
  },
  {
    id: 18,
    name: "Sally Ride Achievement",
    rank: "Cadet Major",
    abbr: "C/Maj",
    phase: "Phase IV",
    requirements: [
      "Minimum 8 weeks after Boyd",
      "Complete Learn to Lead Chapter 15",
      "Complete SDA requirement",
      "Complete aerospace block test",
      "Meet HFZ"
    ],
    drill: ["No new drill test", "Manage and mentor cadet leaders"]
  },
  {
    id: 19,
    name: "Achievement 16",
    rank: "Cadet Major",
    abbr: "C/Maj",
    phase: "Phase IV",
    requirements: [
      "Minimum 8 weeks after Sally Ride",
      "Complete Learn to Lead Chapter 16",
      "Complete SDA requirement",
      "Complete aerospace block test",
      "Meet HFZ"
    ],
    drill: ["No new drill test", "Model senior cadet leadership"]
  },
  {
    id: 20,
    name: "Ira C. Eaker Award",
    rank: "Cadet Lieutenant Colonel",
    abbr: "C/Lt Col",
    phase: "Phase IV Milestone",
    requirements: [
      "Minimum 8 weeks after Achievement 16",
      "Complete required speech and essay",
      "Meet HFZ",
      "Graduate leadership academy",
      "Meet general advancement requirements"
    ],
    drill: ["No new drill test", "Guide cadet staff"]
  },
  {
    id: 21,
    name: "Carl A. Spaatz Award",
    rank: "Cadet Colonel",
    abbr: "C/Col",
    phase: "Pinnacle Award",
    requirements: [
      "Earn Eaker Award",
      "Pass comprehensive leadership exam",
      "Pass comprehensive aerospace exam",
      "Pass fitness assessment",
      "Complete essay exam"
    ],
    drill: ["No additional drill test", "Represent highest cadet standard"]
  }
];

const DRILL_GROUPS = [
  {
    category: "Stationary Movements",
    items: [
      {
        name: "Attention",
        command: "Flight, ATTENTION",
        purpose: "The basic position of military bearing. Cadets stand still, silent, and ready for the next command.",
        steps: [
          "Heels together and on line.",
          "Feet turned out evenly.",
          "Legs straight without locking the knees.",
          "Body upright with shoulders level.",
          "Arms hang naturally with thumbs along trouser seams.",
          "Hands are cupped with fingers joined.",
          "Head and eyes straight forward.",
          "Remain silent and still."
        ],
        mistakes: [
          "Looking around.",
          "Talking.",
          "Feet too wide.",
          "Hands flat instead of cupped.",
          "Moving after the command."
        ],
        tips: [
          "Practice holding attention for 30 seconds.",
          "Check feet, hands, eyes, and posture every time."
        ]
      },
      {
        name: "Parade Rest",
        command: "Parade, REST",
        purpose: "A disciplined rest position used while remaining in formation.",
        steps: [
          "Move the left foot about shoulder width to the left.",
          "Place hands behind the back.",
          "Right hand rests in the palm of the left hand.",
          "Keep head and eyes forward.",
          "Remain silent."
        ],
        mistakes: [
          "Feet too wide.",
          "Hands placed incorrectly.",
          "Slouching.",
          "Talking at parade rest."
        ],
        tips: [
          "Move the foot and hands at the same time.",
          "Freeze once in position."
        ]
      },
      {
        name: "Present Arms",
        command: "Present, ARMS",
        purpose: "Used to render a salute.",
        steps: [
          "Start from attention.",
          "Raise the right hand smartly.",
          "Fingers and thumb are joined.",
          "Palm is slightly down.",
          "Hold the salute until Order Arms."
        ],
        mistakes: [
          "Palm facing out.",
          "Fingers separated.",
          "Elbow too low.",
          "Dropping the salute early."
        ],
        tips: [
          "Practice in front of a mirror.",
          "Make the salute sharp, not rushed."
        ]
      },
      {
        name: "Order Arms",
        command: "Order, ARMS",
        purpose: "Returns the cadet from salute to attention.",
        steps: [
          "Lower the right hand smartly.",
          "Return hand to the side.",
          "Resume attention.",
          "Remain still."
        ],
        mistakes: [
          "Dropping the hand lazily.",
          "Slapping the leg.",
          "Moving the feet."
        ],
        tips: [
          "Practice Present Arms and Order Arms together."
        ]
      },
      {
        name: "Right Face",
        command: "Right, FACE",
        purpose: "Turns the cadet 90 degrees to the right.",
        steps: [
          "Start at attention.",
          "Pivot right on the right heel and left toe.",
          "Keep arms pinned to the sides.",
          "Bring the left foot beside the right foot.",
          "Finish at attention."
        ],
        mistakes: [
          "Swinging arms.",
          "Taking extra steps.",
          "Turning too far or not far enough.",
          "Looking down."
        ],
        tips: [
          "Practice slowly first.",
          "Finish square and still."
        ]
      },
      {
        name: "Left Face",
        command: "Left, FACE",
        purpose: "Turns the cadet 90 degrees to the left.",
        steps: [
          "Start at attention.",
          "Pivot left on the left heel and right toe.",
          "Keep arms still.",
          "Bring the right foot beside the left foot.",
          "Finish at attention."
        ],
        mistakes: [
          "Stepping instead of pivoting.",
          "Feet not coming together.",
          "Moving arms.",
          "Finishing crooked."
        ],
        tips: [
          "Practice Right Face and Left Face in sets."
        ]
      },
      {
        name: "About Face",
        command: "About, FACE",
        purpose: "Turns the cadet 180 degrees to face the opposite direction.",
        steps: [
          "Start at attention.",
          "Place the ball of the right foot behind and slightly left of the left heel.",
          "Pivot 180 degrees to the right.",
          "Bring heels together.",
          "Finish at attention."
        ],
        mistakes: [
          "Turning left.",
          "Taking extra steps.",
          "Feet too far apart after turning.",
          "Arms moving."
        ],
        tips: [
          "Use a floor line to practice finishing square."
        ]
      }
    ]
  },
  {
    category: "Marching Movements",
    items: [
      {
        name: "Forward March",
        command: "Forward, MARCH",
        purpose: "Moves the cadet or flight forward in step.",
        steps: [
          "Start at attention or from a halt.",
          "Step off with the left foot.",
          "March in cadence.",
          "Keep eyes forward.",
          "Maintain proper distance and alignment."
        ],
        mistakes: [
          "Stepping off with the right foot.",
          "Looking down.",
          "Getting out of step.",
          "Uneven steps."
        ],
        tips: [
          "Use left-right-left cadence.",
          "Practice stepping off cleanly."
        ]
      },
      {
        name: "Flight Halt",
        command: "Flight, HALT",
        purpose: "Stops a marching flight in a controlled manner.",
        steps: [
          "Command is given while marching.",
          "Take the proper final step.",
          "Bring the trailing foot beside the lead foot.",
          "Stop at attention.",
          "Maintain formation."
        ],
        mistakes: [
          "Stopping too early.",
          "Taking extra steps.",
          "Feet not together.",
          "Cadets stopping at different times."
        ],
        tips: [
          "Practice marching 8 steps, then halting."
        ]
      },
      {
        name: "Column Right",
        command: "Column Right, MARCH",
        purpose: "Turns the flight 90 degrees to the right while marching.",
        steps: [
          "Command is given while marching.",
          "The flight turns as a unit.",
          "Inside cadets shorten steps.",
          "Outside cadets maintain cadence and spacing.",
          "Continue marching in the new direction."
        ],
        mistakes: [
          "Cutting the corner.",
          "Losing spacing.",
          "Breaking cadence.",
          "Cadets turning at different times."
        ],
        tips: [
          "Use cones or a sidewalk corner for practice."
        ]
      },
      {
        name: "Column Left",
        command: "Column Left, MARCH",
        purpose: "Turns the flight 90 degrees to the left while marching.",
        steps: [
          "Command is given while marching.",
          "The flight turns as a unit.",
          "Inside cadets shorten steps.",
          "Outside cadets adjust to maintain formation.",
          "Continue marching in the new direction."
        ],
        mistakes: [
          "Overrunning the turn.",
          "Spacing opens up.",
          "Cadets watch their feet.",
          "Formation gets crooked."
        ],
        tips: [
          "Practice both left and right column movements."
        ]
      },
      {
        name: "To the Rear March",
        command: "To the Rear, MARCH",
        purpose: "Reverses direction while marching.",
        steps: [
          "Command is given while marching.",
          "Pivot to the right.",
          "Turn 180 degrees without stopping.",
          "Step off in the new direction.",
          "Maintain cadence."
        ],
        mistakes: [
          "Turning left.",
          "Stopping before turning.",
          "Losing cadence.",
          "Swinging arms."
        ],
        tips: [
          "Practice individually before doing it as a flight."
        ]
      },
      {
        name: "Change Step March",
        command: "Change Step, MARCH",
        purpose: "Corrects cadence without stopping.",
        steps: [
          "Command is given while marching.",
          "Shorten one step.",
          "Bring the trailing foot near the lead foot.",
          "Step off again with the correct foot.",
          "Return to normal cadence."
        ],
        mistakes: [
          "Stopping completely.",
          "Hopping.",
          "Looking down.",
          "Overcorrecting."
        ],
        tips: [
          "Practice alone first, then behind another cadet."
        ]
      }
    ]
  },
  {
    category: "Flight Formation",
    items: [
      {
        name: "Fall In",
        command: "FALL IN",
        purpose: "Forms the flight into ranks and elements.",
        steps: [
          "Cadets move quickly and quietly into formation.",
          "Element leaders establish position.",
          "Cadets form in assigned order.",
          "Maintain proper interval and distance.",
          "Come to attention."
        ],
        mistakes: [
          "Talking.",
          "Slow movement.",
          "Wrong spacing.",
          "Wrong order in formation."
        ],
        tips: [
          "Practice forming from different starting points."
        ]
      },
      {
        name: "Dress Right Dress",
        command: "Dress Right, DRESS",
        purpose: "Aligns the flight side-to-side.",
        steps: [
          "Raise the left arm as required.",
          "Turn head and eyes to the right unless in the base file.",
          "Adjust position with short steps.",
          "Maintain proper interval.",
          "Hold until Ready Front."
        ],
        mistakes: [
          "Large steps.",
          "Bent arm.",
          "Looking the wrong way.",
          "Moving after alignment."
        ],
        tips: [
          "Use a floor line or sidewalk crack for practice."
        ]
      },
      {
        name: "Ready Front",
        command: "Ready, FRONT",
        purpose: "Returns the flight from alignment to attention.",
        steps: [
          "Lower the arm smartly.",
          "Snap head and eyes front.",
          "Stop moving.",
          "Resume attention."
        ],
        mistakes: [
          "Lowering arm slowly.",
          "Still shuffling feet.",
          "Looking around."
        ],
        tips: [
          "Practice directly after Dress Right Dress."
        ]
      },
      {
        name: "Open Ranks",
        command: "Open Ranks, MARCH",
        purpose: "Opens the formation for inspection.",
        steps: [
          "Start from a properly formed flight.",
          "Ranks move to inspection spacing.",
          "Cadets halt and dress.",
          "Flight commander or sergeant checks alignment.",
          "Hold position for inspection."
        ],
        mistakes: [
          "Wrong number of steps by rank.",
          "Poor alignment.",
          "Cadets forget to dress.",
          "Talking during inspection."
        ],
        tips: [
          "Practice with rank labels first.",
          "Use official evaluator guidance for exact test standard."
        ]
      },
      {
        name: "Close Ranks",
        command: "Close Ranks, MARCH",
        purpose: "Returns the flight from open ranks to normal formation.",
        steps: [
          "Command is given after open ranks.",
          "Ranks close back to normal distance.",
          "Cadets halt together.",
          "Return to attention."
        ],
        mistakes: [
          "Wrong rank moving first.",
          "Extra steps.",
          "Poor distance between ranks.",
          "Moving after halt."
        ],
        tips: [
          "Practice Open Ranks and Close Ranks together."
        ]
      },
      {
        name: "Count Off",
        command: "Count, OFF",
        purpose: "Numbers cadets in formation for accountability or drill control.",
        steps: [
          "Start at attention.",
          "Cadets count in sequence.",
          "Speak loudly and clearly.",
          "Turn head as required.",
          "Return head and eyes forward."
        ],
        mistakes: [
          "Counting too quietly.",
          "Skipping numbers.",
          "Turning the wrong way.",
          "Speaking over another cadet."
        ],
        tips: [
          "Practice with a small group first."
        ]
      }
    ]
  },
  {
    category: "Leadership",
    items: [
      {
        name: "Form the Flight",
        command: "FALL IN",
        purpose: "The cadet leader takes control and organizes the flight.",
        steps: [
          "Choose a clear formation area.",
          "Call the flight to fall in.",
          "Position element leaders and ranks.",
          "Check dress, cover, interval, and distance.",
          "Give follow-on commands clearly."
        ],
        mistakes: [
          "Weak command voice.",
          "Standing in the wrong position.",
          "Not correcting spacing.",
          "Giving commands before the flight is ready."
        ],
        tips: [
          "Practice command voice outside.",
          "Know where to stand before calling the command."
        ]
      },
      {
        name: "Report to Commander",
        command: "Sir/Ma’am, flight is prepared for inspection.",
        purpose: "Reports flight status to a commander or evaluator.",
        steps: [
          "Ensure the flight is formed and ready.",
          "Salute when appropriate.",
          "Give the report clearly.",
          "Maintain bearing.",
          "Hold position until directed."
        ],
        mistakes: [
          "Forgetting the salute.",
          "Speaking too quietly.",
          "Looking back at the flight.",
          "Wrong wording."
        ],
        tips: [
          "Practice the report out loud."
        ]
      },
      {
        name: "Give Commands",
        command: "Preparatory command + command of execution",
        purpose: "Leads cadets through drill movements.",
        steps: [
          "Give a clear preparatory command.",
          "Pause briefly.",
          "Give the command of execution sharply.",
          "Use enough volume.",
          "Watch the flight and correct mistakes."
        ],
        mistakes: [
          "Mumbling.",
          "No pause between commands.",
          "Command of execution not sharp.",
          "Giving commands too fast."
        ],
        tips: [
          "Record yourself and listen for clarity."
        ]
      },
      {
        name: "Teach Junior Cadets",
        command: "Demonstrate, explain, practice, correct",
        purpose: "Helps new cadets learn drill safely and correctly.",
        steps: [
          "Demonstrate the movement.",
          "Explain the command and purpose.",
          "Break the movement into steps.",
          "Let cadets practice.",
          "Correct one or two things at a time."
        ],
        mistakes: [
          "Explaining too much at once.",
          "Not demonstrating.",
          "Correcting harshly.",
          "Letting bad reps continue."
        ],
        tips: [
          "Praise effort, then correct the biggest issue."
        ]
      }
    ]
  }
];

const CHECKLIST_SECTIONS = [
  {
    id: "blues",
    title: "Blues Uniform Checklist",
    items: [
      "Blues shirt",
      "Blues pants / slacks",
      "Blue belt and buckle",
      "Black dress shoes",
      "Black dress socks",
      "White V-neck undershirt",
      "Nameplate",
      "Grade insignia",
      "Flight cap",
      "Ribbons / rack if required",
      "Uniform clean, pressed, and inspected",
      "Haircut / grooming meets CAP standards"
    ]
  },
  {
    id: "field",
    title: "Field Uniform Checklist",
    items: [
      "Authorized field uniform blouse",
      "Authorized field uniform trousers",
      "Tan undershirts",
      "Boots",
      "Boot socks",
      "Uniform belt",
      "Patrol cap / authorized cover",
      "Name tape",
      "CAP tape",
      "Grade insignia",
      "Boots broken in",
      "Uniform marked with cadet name"
    ]
  },
  {
    id: "gear",
    title: "Gear / Buy List",
    items: [
      "Name tapes ordered",
      "Grade insignia ordered",
      "Blues items purchased",
      "Field uniform items purchased",
      "Shoes or boots ready",
      "PT gear ready",
      "Notebook and pen",
      "Haircut / grooming squared away",
      "Laundry plan",
      "All required items labeled with name"
    ]
  },
  {
    id: "encampmentCarry",
    title: "Encampment: Carry at Check-In",
    items: [
      "CAP membership card",
      "Printed health history / medical forms",
      "Emergency contact information",
      "OTC medication permission form if required",
      "Prescription medication in original container if applicable",
      "Any required check-in paperwork",
      "Travel itinerary / arrival instructions",
      "Small folder or envelope for check-in documents",
      "Do not bury check-in items inside luggage"
    ]
  },
  {
    id: "encampmentArrivalUniform",
    title: "Encampment: Arrival Uniform",
    items: [
      "Arrive in the uniform required by the encampment packing list",
      "Uniform blouse",
      "Uniform trousers",
      "Tan undershirt",
      "Boots",
      "Boot socks",
      "Belt",
      "Cover / patrol cap",
      "Name tape",
      "CAP tape",
      "Grade insignia",
      "Hair and nails within regulations before check-in"
    ]
  },
  {
    id: "encampmentField",
    title: "Encampment: Field Uniforms",
    items: [
      "Extra field uniform blouse",
      "Extra field uniform trousers",
      "Extra tan undershirts",
      "Extra boot socks",
      "Extra belt if available",
      "Cold weather layer if authorized",
      "Rain gear or poncho if listed",
      "Laundry bag",
      "Uniform repair items if allowed",
      "All clothing marked with cadet name"
    ]
  },
  {
    id: "encampmentBlues",
    title: "Encampment: Blues Uniform",
    items: [
      "Blues shirt",
      "Blues pants / slacks",
      "Blue belt and buckle",
      "Black dress shoes",
      "Black socks",
      "White V-neck undershirts",
      "Flight cap",
      "Nameplate",
      "Grade insignia",
      "Ribbons / rack if required",
      "Shirt stays if used",
      "Lint roller if allowed"
    ]
  },
  {
    id: "encampmentPt",
    title: "Encampment: PT Gear / Clothing",
    items: [
      "PT shirts",
      "PT shorts",
      "PT pants / sweats if required",
      "Athletic socks",
      "Running shoes",
      "Extra underwear",
      "Extra socks",
      "Sleepwear",
      "Civilian travel clothes if authorized",
      "Plastic bag for dirty or wet clothes"
    ]
  },
  {
    id: "encampmentHygiene",
    title: "Encampment: Hygiene",
    items: [
      "Toothbrush",
      "Toothpaste",
      "Deodorant",
      "Shampoo",
      "Soap / body wash",
      "Towels",
      "Washcloth",
      "Shower shoes",
      "Comb or brush",
      "Razor / shaving items if needed",
      "Feminine hygiene items if needed",
      "Nail clippers",
      "Sunscreen",
      "Lip balm",
      "Insect repellent"
    ]
  },
  {
    id: "encampmentGearRequired",
    title: "Encampment: Required Gear",
    items: [
      "Water bottle / hydration item",
      "Notebook",
      "Pens",
      "Pencils",
      "Small ruler",
      "Flashlight",
      "Extra batteries if needed",
      "Hangers",
      "Shoe shine / boot care items if required",
      "Moleskin / blister care",
      "Laundry bag",
      "Watch if allowed",
      "Eyeglasses / contacts and supplies if needed"
    ]
  },
  {
    id: "encampmentOptional",
    title: "Encampment: Optional Items",
    items: [
      "Small sewing kit if allowed",
      "Small mirror if allowed",
      "Extra boot laces",
      "Stamped envelope / notepad if desired",
      "Religious text or small reading material if allowed",
      "Disposable camera if allowed",
      "Iron / starch only if specifically allowed",
      "Extra name-marking tape or laundry marker"
    ]
  },
  {
    id: "encampmentNoBring",
    title: "Encampment: Do Not Bring / Verify",
    items: [
      "Do not bring items prohibited by the encampment packing list",
      "Do not bring weapons or knives",
      "Do not bring tobacco, vape products, alcohol, or drugs",
      "Do not bring unnecessary electronics if restricted",
      "Do not bring excess snacks or food unless authorized",
      "Do not bring valuables that can be lost or damaged",
      "Verify phone policy before arrival",
      "Verify medication turn-in rules before arrival"
    ]
  }
];

const DOCS = [
  { name: "eServices Login", category: "Official Login", url: "https://www.capnhq.gov/" },
  { name: "Parent / Guardian Portal", category: "Official Parent Portal", url: "https://www.gocivilairpatrol.com/programs/cadets/parents/parent-guardian-portal" },
  { name: "Cadet Achievement Requirements", category: "Cadet Program", url: "https://www.gocivilairpatrol.com/programs/cadets/stripes-to-diamonds" },
  { name: "Cadet Tests & Exams", category: "Testing", url: "https://www.gocivilairpatrol.com/programs/cadets/stripes-to-diamonds/cadet-tests--exams" },
  { name: "Drill & Ceremonies Library", category: "Drill", url: "https://www.gocivilairpatrol.com/programs/cadets/library/drill" },
  { name: "CAPP 60-33 Drill & Ceremonies", category: "Drill PDF", url: "https://www.gocivilairpatrol.com/media/cms/CAPP6020_5_AUG_16_07A0C6200BA4C.pdf" },
  { name: "CAPP 60-34 Practical Drill Tests", category: "Drill Tests PDF", url: "https://www.gocivilairpatrol.com/media/cms/CAPP_6034_Sept_24_3e0cc652c818b.pdf" },
  { name: "Vanguard Civil Air Patrol Store", category: "Uniforms / Insignia / CAP Gear", url: "https://www.vanguardmil.com/pages/cap-landing-page-insignia" }
];

const STORAGE_KEY = "cap_cadet_hub_v10";

const DEFAULT_DATA = {
  dark: false,
  profile: DEFAULT_PROFILE,
  completedIds: [],
  checks: {},
  notes: {},
  listChecks: {},
  events: []
};

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_DATA, ...JSON.parse(saved) };

    return {
      ...DEFAULT_DATA,
      profile: JSON.parse(localStorage.getItem("cap_profile") || "null") || DEFAULT_PROFILE,
      completedIds: JSON.parse(localStorage.getItem("cap_completed_ids") || "[]"),
      checks: JSON.parse(localStorage.getItem("cap_checks") || "{}"),
      notes: JSON.parse(localStorage.getItem("cap_notes") || "{}"),
      listChecks: JSON.parse(localStorage.getItem("cap_list_checks") || "{}"),
      events: JSON.parse(localStorage.getItem("cap_events") || "[]"),
      dark: JSON.parse(localStorage.getItem("cap_dark") || "false")
    };
  } catch {
    return DEFAULT_DATA;
  }
}

function formatDate(value) {
  if (!value) return "No date";
  try {
    return new Date(value + "T12:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return value;
  }
}

function addWeeks(dateValue, weeks) {
  const base = dateValue ? new Date(dateValue + "T12:00:00") : new Date();
  if (Number.isNaN(base.getTime())) return "";
  base.setDate(base.getDate() + weeks * 7);
  return base.toISOString().slice(0, 10);
}

function getCurrentRank(completedIds) {
  if (!completedIds.length) return { rank: "Cadet Recruit", abbr: "C/Rec" };
  const highest = Math.max(...completedIds);
  const item = ACHIEVEMENTS.find((a) => a.id === highest);
  return item ? { rank: item.rank, abbr: item.abbr } : { rank: "Cadet Recruit", abbr: "C/Rec" };
}

function cleanCadetName(name, rank) {
  const clean = String(name || "Cadet")
    .replace(/^cadet\s+/i, "")
    .replace(/^c\/[a-z0-9]+\s+/i, "")
    .trim();

  return `${rank.abbr} ${clean || "Cadet"}`;
}

function buildReport(data, currentRank, currentAchievement, progress, nextStep) {
  const eventText =
    data.events
      .slice(0, 8)
      .map((e) => `- ${formatDate(e.date)}: ${e.title} (${e.type})`)
      .join("\n") || "- No events logged";

  return `CAP Cadet Parent Report

Cadet: ${cleanCadetName(data.profile.name, currentRank)}
CAP ID: ${data.profile.capId || "Not entered"}
Squadron: ${data.profile.squadron}
Goal: ${data.profile.goal}

Progress:
- Completed: ${data.completedIds.length} of ${ACHIEVEMENTS.length}
- Overall: ${progress}%
- Current target: ${currentAchievement.name}
- Next step: ${nextStep}

Events:
${eventText}

Generated: ${new Date().toLocaleString()}
`;
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function getNextStep(achievement, checks) {
  if (!achievement) return "All achievements complete.";

  for (let i = 0; i < achievement.requirements.length; i++) {
    if (!checks[`${achievement.id}-req-${i}`]) return `Complete: ${achievement.requirements[i]}`;
  }

  for (let i = 0; i < achievement.drill.length; i++) {
    if (!checks[`${achievement.id}-drill-${i}`]) return `Drill: ${achievement.drill[i]}`;
  }

  return "Ready to mark complete.";
}

function App() {
  const [data, setData] = useState(loadData);
  const [tab, setTab] = useState("home");
  const [search, setSearch] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [selectedDrill, setSelectedDrill] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const completedIds = data.completedIds.filter((id) => ACHIEVEMENTS.some((a) => a.id === id));
  const currentRank = getCurrentRank(completedIds);
  const currentAchievement = ACHIEVEMENTS.find((a) => !completedIds.includes(a.id)) || ACHIEVEMENTS[ACHIEVEMENTS.length - 1];
  const progress = Math.round((completedIds.length / ACHIEVEMENTS.length) * 100);
  const nextStep = getNextStep(currentAchievement, data.checks);

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];

    const ranks = ACHIEVEMENTS.filter((a) =>
      [a.name, a.rank, a.abbr, a.phase, ...a.requirements, ...a.drill].join(" ").toLowerCase().includes(q)
    ).map((a) => ({ type: "Rank", title: a.name, sub: `${a.rank} · ${a.phase}`, action: () => setSelectedAchievement(a) }));

    const drill = DRILL_GROUPS.flatMap((group) =>
      group.items
        .filter((d) =>
          [d.name, d.command, d.purpose, ...d.steps, ...d.mistakes, ...d.tips].join(" ").toLowerCase().includes(q)
        )
        .map((d) => ({
          type: "Drill",
          title: d.name,
          sub: `${group.category} · ${d.command}`,
          action: () => {
            setSelectedDrill({ ...d, category: group.category });
            setTab("drill");
          }
        }))
    );

    const docs = DOCS.filter((d) => [d.name, d.category].join(" ").toLowerCase().includes(q)).map((d) => ({
      type: "Doc",
      title: d.name,
      sub: d.category,
      action: () => window.open(d.url, "_blank", "noreferrer")
    }));

    return [...ranks, ...drill, ...docs].slice(0, 12);
  }, [search]);

  function updateData(patch) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function toggleAchievement(id) {
    updateData({
      completedIds: completedIds.includes(id)
        ? completedIds.filter((x) => x !== id)
        : [...completedIds, id].sort((a, b) => a - b)
    });
  }

  function toggleCheck(achievement, type, index) {
    const key = `${achievement.id}-${type}-${index}`;
    const nextChecks = { ...data.checks, [key]: !data.checks[key] };

    const reqDone = achievement.requirements.every((_, i) => nextChecks[`${achievement.id}-req-${i}`]);
    const drillDone = achievement.drill.every((_, i) => nextChecks[`${achievement.id}-drill-${i}`]);

    let nextCompleted = [...completedIds];

    if (reqDone && drillDone && !nextCompleted.includes(achievement.id)) {
      nextCompleted.push(achievement.id);
    }

    if ((!reqDone || !drillDone) && nextCompleted.includes(achievement.id)) {
      nextCompleted = nextCompleted.filter((id) => id !== achievement.id);
    }

    updateData({
      checks: nextChecks,
      completedIds: nextCompleted.sort((a, b) => a - b)
    });
  }

  function toggleList(sectionId, item) {
    const key = `${sectionId}-${item}`;
    updateData({
      listChecks: { ...data.listChecks, [key]: !data.listChecks[key] }
    });
  }

  function resetAll() {
    if (!window.confirm("Reset all CAP Cadet Hub data on this device?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setData(DEFAULT_DATA);
    setSelectedAchievement(null);
    setSelectedDrill(null);
    setTab("home");
  }

  function exportBackup() {
    const text = JSON.stringify({ app: "CAP Cadet Hub", version: 10, exportedAt: new Date().toISOString(), ...data }, null, 2);
    navigator.clipboard?.writeText(text).catch(() => {});
    downloadText("cap-cadet-hub-backup.json", text);
  }

  function exportReport() {
    const text = buildReport(data, currentRank, currentAchievement, progress, nextStep);
    downloadText("cap-cadet-parent-report.txt", text);
  }

  function importBackup(text) {
    try {
      const parsed = JSON.parse(text);
      setData({
        ...DEFAULT_DATA,
        ...parsed,
        profile: { ...DEFAULT_PROFILE, ...(parsed.profile || {}) },
        completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
        checks: parsed.checks || {},
        notes: parsed.notes || {},
        listChecks: parsed.listChecks || {},
        events: Array.isArray(parsed.events) ? parsed.events : []
      });
      alert("Backup restored.");
    } catch {
      alert("Backup text is not valid JSON.");
    }
  }

  const appStyle = {
    ...styles.page,
    ...(data.dark ? styles.darkVars : styles.lightVars)
  };

  return (
    <div style={appStyle}>
      <button style={styles.themeButton} onClick={() => updateData({ dark: !data.dark })}>
        {data.dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <main style={styles.container}>
        {selectedAchievement ? (
          <AchievementDetail
            achievement={selectedAchievement}
            completedIds={completedIds}
            checks={data.checks}
            notes={data.notes}
            updateData={updateData}
            onBack={() => setSelectedAchievement(null)}
            toggleAchievement={toggleAchievement}
            toggleCheck={toggleCheck}
          />
        ) : (
          <>
            <SearchBar search={search} setSearch={setSearch} results={searchResults} />

            {tab === "home" && (
              <HomeTab
                data={data}
                currentRank={currentRank}
                currentAchievement={currentAchievement}
                completedCount={completedIds.length}
                progress={progress}
                nextStep={nextStep}
                setTab={setTab}
                exportReport={exportReport}
              />
            )}

            {tab === "ranks" && (
              <RanksTab
                data={data}
                updateData={updateData}
                currentRank={currentRank}
                currentAchievement={currentAchievement}
                completedIds={completedIds}
                progress={progress}
                setSelectedAchievement={setSelectedAchievement}
                toggleAchievement={toggleAchievement}
              />
            )}

            {tab === "drill" && (
              <DrillTab selectedDrill={selectedDrill} setSelectedDrill={setSelectedDrill} />
            )}

            {tab === "tools" && (
              <ToolsTab listChecks={data.listChecks} toggleList={toggleList} />
            )}

            {tab === "events" && (
              <EventsTab events={data.events} updateData={updateData} />
            )}

            {tab === "docs" && (
              <DocsTab
                data={data}
                importBackup={importBackup}
                exportBackup={exportBackup}
                exportReport={exportReport}
                resetAll={resetAll}
              />
            )}
          </>
        )}
      </main>

      {!selectedAchievement && (
        <nav style={styles.bottomNav}>
          {[
            ["home", "🏠", "Home"],
            ["ranks", "⭐", "Ranks"],
            ["drill", "🪖", "Drill"],
            ["tools", "🧰", "Tools"],
            ["events", "📅", "Events"],
            ["docs", "📁", "Docs"]
          ].map(([id, icon, label]) => (
            <button
              key={id}
              style={tab === id ? styles.activeNavButton : styles.navButton}
              onClick={() => setTab(id)}
            >
              <span style={styles.navIcon}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function SearchBar({ search, setSearch, results }) {
  return (
    <div style={styles.searchWrap}>
      <input
        style={styles.searchInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search ranks, drill, docs..."
      />

      {results.length > 0 && (
        <div style={styles.searchResults}>
          {results.map((result, index) => (
            <button
              key={index}
              style={styles.searchResult}
              onClick={() => {
                result.action();
                setSearch("");
              }}
            >
              <strong>{result.title}</strong>
              <span>{result.type} · {result.sub}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function HomeTab({ data, currentRank, currentAchievement, completedCount, progress, nextStep, setTab, exportReport }) {
  const nextEvent = [...data.events].sort((a, b) => String(a.date).localeCompare(String(b.date)))[0];

  return (
    <>
      <Hero
        title="CAP Cadet Hub"
        eyebrow="Cadet Dashboard"
        subtitle="Progress, drill, encampment packing, events, and parent tools."
        progress={progress}
        progressText={`${completedCount} of ${ACHIEVEMENTS.length} achievements completed`}
      />

      <Card>
        <p style={styles.label}>Cadet</p>
        <h2 style={styles.profileName}>{cleanCadetName(data.profile.name, currentRank)}</h2>
        <p style={styles.cardText}>CAP ID: {data.profile.capId || "Not entered"}</p>
        <p style={styles.cardText}>{data.profile.squadron}</p>
        <p style={styles.phaseText}>Goal: {data.profile.goal}</p>
      </Card>

      <Card>
        <p style={styles.label}>Next Step</p>
        <strong style={styles.blueText}>{currentAchievement.name}</strong>
        <p style={styles.cardText}>{nextStep}</p>
      </Card>

      <Card>
        <p style={styles.label}>Next Event</p>
        {nextEvent ? (
          <>
            <strong style={styles.blueText}>{nextEvent.title}</strong>
            <p style={styles.cardText}>{formatDate(nextEvent.date)} · {nextEvent.time || "No time"}</p>
            <p style={styles.phaseText}>{nextEvent.type} · {nextEvent.location || "No location"}</p>
          </>
        ) : (
          <p style={styles.cardText}>No events added yet.</p>
        )}
      </Card>

      <TimelineCard profile={data.profile} completedCount={completedCount} />

      <div style={styles.quickGrid}>
        <button style={styles.quickButton} onClick={() => setTab("ranks")}>⭐ Ranks</button>
        <button style={styles.quickButton} onClick={() => setTab("drill")}>🪖 Drill</button>
        <button style={styles.quickButton} onClick={() => setTab("tools")}>🎒 Packing</button>
        <button style={styles.quickButton} onClick={exportReport}>📝 Report</button>
      </div>
    </>
  );
}

function RanksTab({ data, updateData, currentRank, currentAchievement, completedIds, progress, setSelectedAchievement, toggleAchievement }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(data.profile);

  function saveProfile() {
    updateData({ profile: { ...DEFAULT_PROFILE, ...form } });
    setEditing(false);
  }

  return (
    <>
      <Hero
        title="Rank Tracker"
        eyebrow="Civil Air Patrol"
        subtitle="Track requirements, drill items, and promotion path."
        progress={progress}
        progressText={`${completedIds.length} of ${ACHIEVEMENTS.length} completed`}
      />

      <Card>
        {!editing ? (
          <>
            <p style={styles.label}>Cadet Profile</p>
            <h2 style={styles.profileName}>{cleanCadetName(data.profile.name, currentRank)}</h2>
            <p style={styles.cardText}>CAP ID: {data.profile.capId || "Not entered"}</p>
            <p style={styles.cardText}>{data.profile.squadron}</p>
            <p style={styles.phaseText}>Joined: {formatDate(data.profile.joined)}</p>
            <p style={styles.phaseText}>Goal: {data.profile.goal}</p>
            <button style={styles.smallButton} onClick={() => { setForm(data.profile); setEditing(true); }}>Edit Profile</button>
          </>
        ) : (
          <>
            <p style={styles.label}>Edit Profile</p>
            <input style={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Cadet last name" />
            <input style={styles.input} value={form.capId} onChange={(e) => setForm({ ...form, capId: e.target.value })} placeholder="CAP ID" />
            <input style={styles.input} value={form.squadron} onChange={(e) => setForm({ ...form, squadron: e.target.value })} placeholder="Squadron" />
            <input style={styles.input} type="date" value={form.joined} onChange={(e) => setForm({ ...form, joined: e.target.value })} />
            <input style={styles.input} value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} placeholder="Goal" />
            <button style={styles.primaryButton} onClick={saveProfile}>Save Profile</button>
          </>
        )}
      </Card>

      <Card>
        <p style={styles.label}>Current Target</p>
        <strong style={styles.blueText}>{currentAchievement.name}</strong>
        <p style={styles.cardText}>{currentAchievement.rank} · {currentAchievement.abbr}</p>
        <p style={styles.phaseText}>{getNextStep(currentAchievement, data.checks)}</p>
      </Card>

      <h2 style={styles.sectionTitle}>Achievement Path</h2>

      {ACHIEVEMENTS.map((item) => {
        const done = completedIds.includes(item.id);
        const current = currentAchievement.id === item.id && !done;

        return (
          <div
            key={item.id}
            style={{
              ...styles.rankCard,
              border: current ? "2px solid #2563eb" : done ? "2px solid #22c55e" : "1px solid var(--card-border)"
            }}
          >
            <button style={circleButton(done)} onClick={() => toggleAchievement(item.id)}>{done ? "✓" : ""}</button>

            <button style={styles.cardMainButton} onClick={() => setSelectedAchievement(item)}>
              <div>
                <strong style={styles.blueText}>{item.name}</strong>
                <p style={styles.cardText}>{item.rank} · {item.abbr}</p>
                <p style={styles.phaseText}>{item.phase}</p>
                {current && <span style={styles.currentTag}>Current Target</span>}
                {done && <span style={styles.doneTag}>Completed</span>}
              </div>
              <span style={styles.arrow}>›</span>
            </button>
          </div>
        );
      })}
    </>
  );
}

function AchievementDetail({ achievement, completedIds, checks, notes, updateData, onBack, toggleAchievement, toggleCheck }) {
  const done = completedIds.includes(achievement.id);
  const reqDone = achievement.requirements.filter((_, i) => checks[`${achievement.id}-req-${i}`]).length;
  const drillDone = achievement.drill.filter((_, i) => checks[`${achievement.id}-drill-${i}`]).length;
  const total = achievement.requirements.length + achievement.drill.length;
  const percent = Math.round(((reqDone + drillDone) / total) * 100);
  const note = notes[achievement.id] || "";

  return (
    <>
      <button style={styles.backButton} onClick={onBack}>← Back</button>

      <Hero title={achievement.name} eyebrow={achievement.phase} subtitle={`${achievement.rank} · ${achievement.abbr}`} />

      <button style={completeButton(done)} onClick={() => toggleAchievement(achievement.id)}>
        {done ? "✓ Marked Complete" : "Mark Achievement Complete"}
      </button>

      <Card>
        <p style={styles.label}>Promotion Progress</p>
        <Progress percent={percent} />
        <p style={styles.cardText}>{reqDone + drillDone} of {total} items checked</p>
        <p style={styles.phaseText}>Requirements: {reqDone} of {achievement.requirements.length} · Drill: {drillDone} of {achievement.drill.length}</p>
      </Card>

      <h2 style={styles.sectionTitle}>Requirements</h2>
      {achievement.requirements.map((item, index) => (
        <CheckRow
          key={item}
          checked={!!checks[`${achievement.id}-req-${index}`]}
          onClick={() => toggleCheck(achievement, "req", index)}
          text={item}
        />
      ))}

      <h2 style={styles.sectionTitle}>Drill</h2>
      {achievement.drill.map((item, index) => (
        <CheckRow
          key={item}
          checked={!!checks[`${achievement.id}-drill-${index}`]}
          onClick={() => toggleCheck(achievement, "drill", index)}
          text={`🪖 ${item}`}
        />
      ))}

      <Card>
        <p style={styles.label}>Parent Notes</p>
        <textarea
          style={styles.textArea}
          value={note}
          onChange={(e) => updateData({ notes: { ...notes, [achievement.id]: e.target.value } })}
          placeholder="Notes, reminders, questions for the squadron, what to practice..."
        />
      </Card>
    </>
  );
}

function DrillTab({ selectedDrill, setSelectedDrill }) {
  return (
    <>
      <Hero
        title="Drill Library"
        eyebrow="Drill Training"
        subtitle="Commands, steps, common mistakes, and practice tips."
      />

      {selectedDrill ? (
        <Card>
          <button style={styles.closeButton} onClick={() => setSelectedDrill(null)}>Close</button>

          <p style={styles.label}>{selectedDrill.category}</p>
          <h2 style={styles.profileName}>{selectedDrill.name}</h2>

          <div style={styles.commandBox}>
            <p style={styles.label}>Command</p>
            <strong>{selectedDrill.command}</strong>
          </div>

          <p style={styles.cardText}>{selectedDrill.purpose}</p>

          <DetailList title="Steps" items={selectedDrill.steps} />
          <DetailList title="Common Mistakes" items={selectedDrill.mistakes} />
          <DetailList title="Practice Tips" items={selectedDrill.tips} />

          <div style={styles.warningBox}>
            <strong>Testing Note</strong>
            <p style={styles.cardText}>
              This is a parent-friendly practice guide. For official testing, use the current CAP drill manual, practical test, and evaluator instructions.
            </p>
          </div>
        </Card>
      ) : (
        DRILL_GROUPS.map((group) => (
          <div key={group.category}>
            <h2 style={styles.sectionTitle}>{group.category}</h2>

            {group.items.map((item) => (
              <button
                key={item.name}
                style={styles.listButton}
                onClick={() => setSelectedDrill({ ...item, category: group.category })}
              >
                <div>
                  <strong style={styles.blueText}>{item.name}</strong>
                  <p style={styles.cardText}>{item.command}</p>
                  <p style={styles.phaseText}>{item.purpose}</p>
                </div>
                <span style={styles.arrow}>›</span>
              </button>
            ))}
          </div>
        ))
      )}
    </>
  );
}

function DetailList({ title, items }) {
  if (!items || !items.length) return null;

  return (
    <div style={styles.detailBlock}>
      <h3 style={styles.detailTitle}>{title}</h3>
      <ul style={styles.detailList}>
        {items.map((item, index) => (
          <li key={index} style={styles.detailListItem}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ToolsTab({ listChecks, toggleList }) {
  return (
    <>
      <Hero
        title="Tools"
        eyebrow="Parent Tools"
        subtitle="Uniforms, gear, and full encampment packing checklists."
      />

      <Card>
        <p style={styles.label}>Encampment Note</p>
        <p style={styles.cardText}>
          Always verify the exact packing list from your wing, region, or encampment staff. This checklist is a parent-friendly organizer and does not replace official instructions.
        </p>
        <p style={styles.phaseText}>
          Mark everything with the cadet’s name. Keep check-in paperwork and medication easy to reach.
        </p>
      </Card>

      {CHECKLIST_SECTIONS.map((section) => (
        <ChecklistCard
          key={section.id}
          section={section}
          checks={listChecks}
          toggle={toggleList}
        />
      ))}
    </>
  );
}

function ChecklistCard({ section, checks, toggle }) {
  const done = section.items.filter((item) => checks[`${section.id}-${item}`]).length;
  const percent = Math.round((done / section.items.length) * 100);

  return (
    <Card>
      <p style={styles.label}>{section.title}</p>
      <Progress percent={percent} />
      <p style={styles.cardText}>{done} of {section.items.length} complete</p>

      {section.items.map((item) => (
        <CheckRow
          key={item}
          checked={!!checks[`${section.id}-${item}`]}
          onClick={() => toggle(section.id, item)}
          text={item}
        />
      ))}
    </Card>
  );
}

function EventsTab({ events, updateData }) {
  const [form, setForm] = useState({ title: "", date: "", time: "", location: "", type: "Meeting", notes: "" });

  function addEvent() {
    if (!form.title || !form.date) return;
    updateData({ events: [{ ...form, id: Date.now() }, ...events] });
    setForm({ title: "", date: "", time: "", location: "", type: "Meeting", notes: "" });
  }

  function deleteEvent(id) {
    updateData({ events: events.filter((event) => event.id !== id) });
  }

  return (
    <>
      <Hero title="Events" eyebrow="Calendar" subtitle="Track meetings, activities, encampment, PT, and notes." />

      <Card>
        <p style={styles.label}>Add Event</p>
        <input style={styles.input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event title" />
        <input style={styles.input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input style={styles.input} type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
        <input style={styles.input} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" />
        <select style={styles.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option>Meeting</option>
          <option>PT</option>
          <option>Activity</option>
          <option>Training</option>
          <option>Encampment</option>
          <option>Other</option>
        </select>
        <textarea style={styles.textArea} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes..." />
        <button style={styles.primaryButton} onClick={addEvent}>Save Event</button>
      </Card>

      {events.map((event) => (
        <Card key={event.id}>
          <strong style={styles.blueText}>{event.title}</strong>
          <p style={styles.cardText}>{formatDate(event.date)} · {event.time || "No time"}</p>
          <p style={styles.phaseText}>{event.type} · {event.location || "No location"}</p>
          {event.notes && <p style={styles.notesText}>{event.notes}</p>}
          <button style={styles.deleteButton} onClick={() => deleteEvent(event.id)}>Delete</button>
        </Card>
      ))}
    </>
  );
}

function DocsTab({ data, importBackup, exportBackup, exportReport, resetAll }) {
  const [backupText, setBackupText] = useState("");

  function copyBackupToBox() {
    const text = JSON.stringify({ app: "CAP Cadet Hub", version: 10, exportedAt: new Date().toISOString(), ...data }, null, 2);
    setBackupText(text);
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  return (
    <>
      <Hero title="Docs" eyebrow="Official CAP Resources" subtitle="Links, reports, backup, and data safety." />

      <Card>
        <p style={styles.label}>Reports & Backup</p>
        <button style={styles.primaryButton} onClick={exportReport}>Export Parent Report</button>
        <button style={styles.primaryButton} onClick={copyBackupToBox}>Show / Copy Backup</button>
        <button style={styles.primaryButton} onClick={exportBackup}>Download Backup File</button>
        <textarea
          style={styles.textArea}
          value={backupText}
          onChange={(e) => setBackupText(e.target.value)}
          placeholder="Backup data appears here. Paste backup data here to restore."
        />
        <button style={styles.primaryButton} onClick={() => importBackup(backupText)}>Import / Restore Backup</button>
        <button style={styles.dangerButton} onClick={resetAll}>Reset App Data</button>
      </Card>

      <Card>
        <strong style={styles.blueText}>Safety Note</strong>
        <p style={styles.cardText}>
          This is an unofficial parent/cadet tracker. It does not connect to eServices and does not store CAP passwords.
        </p>
        <p style={styles.phaseText}>
          Use official CAP resources for real records, tests, regulations, uniforms, and account access.
        </p>
      </Card>

      {DOCS.map((doc) => (
        <a key={doc.name} href={doc.url} target="_blank" rel="noreferrer" style={styles.docCard}>
          <div>
            <strong style={styles.blueText}>{doc.name}</strong>
            <p style={styles.phaseText}>{doc.category}</p>
          </div>
          <span style={styles.arrow}>↗</span>
        </a>
      ))}
    </>
  );
}

function TimelineCard({ profile, completedCount }) {
  const startDate = profile.joined || new Date().toISOString().slice(0, 10);
  const upcoming = ACHIEVEMENTS.slice(completedCount, completedCount + 5);

  return (
    <Card>
      <p style={styles.label}>Promotion Timeline</p>
      <p style={styles.cardText}>Estimated using 8-week minimum windows. Actual timing depends on squadron approval and completed requirements.</p>

      {upcoming.map((item, index) => (
        <div key={item.id} style={styles.timelineItem}>
          <strong>{item.name}</strong>
          <span>{formatDate(addWeeks(startDate, (completedCount + index) * 8))} · {item.rank}</span>
        </div>
      ))}
    </Card>
  );
}

function Hero({ title, eyebrow, subtitle, progress, progressText }) {
  return (
    <section style={styles.hero}>
      <p style={styles.eyebrow}>{eyebrow}</p>
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.subtitle}>{subtitle}</p>

      {typeof progress === "number" && (
        <div style={styles.progressBox}>
          <div style={styles.progressHeader}>
            <span>Progress</span>
            <strong>{progress}%</strong>
          </div>
          <Progress percent={progress} light />
          <p style={styles.progressText}>{progressText}</p>
        </div>
      )}
    </section>
  );
}

function Card({ children }) {
  return <div style={styles.card}>{children}</div>;
}

function Progress({ percent, light = false }) {
  return (
    <div style={light ? styles.progressBarLightHero : styles.progressBarLight}>
      <div style={{ ...styles.progressFillBlue, width: `${Math.max(0, Math.min(100, percent))}%` }} />
    </div>
  );
}

function CheckRow({ checked, onClick, text }) {
  return (
    <button style={checkRowStyle(checked)} onClick={onClick}>
      <span style={checkCircleStyle(checked)}>{checked ? "✓" : ""}</span>
      <span style={checkTextStyle(checked)}>{text}</span>
    </button>
  );
}

function circleButton(done) {
  return {
    width: "34px",
    height: "34px",
    borderRadius: "999px",
    border: done ? "2px solid #22c55e" : "2px solid #94a3b8",
    background: done ? "#22c55e" : "var(--card-bg)",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    flexShrink: 0
  };
}

function completeButton(done) {
  return {
    width: "100%",
    border: "none",
    borderRadius: "14px",
    padding: "13px",
    background: done ? "#22c55e" : "#2563eb",
    color: "white",
    fontWeight: "bold",
    marginBottom: "14px"
  };
}

function checkRowStyle(checked) {
  return {
    width: "100%",
    background: checked ? "rgba(37,99,235,0.14)" : "var(--card-bg)",
    border: checked ? "2px solid #2563eb" : "1px solid var(--card-border)",
    borderRadius: "14px",
    padding: "12px",
    marginTop: "10px",
    color: "var(--text)",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    textAlign: "left"
  };
}

function checkCircleStyle(checked) {
  return {
    width: "24px",
    height: "24px",
    borderRadius: "999px",
    border: checked ? "2px solid #2563eb" : "2px solid #94a3b8",
    background: checked ? "#2563eb" : "var(--card-bg)",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  };
}

function checkTextStyle(checked) {
  return {
    color: checked ? "#60a5fa" : "var(--text)",
    textDecoration: checked ? "line-through" : "none",
    lineHeight: 1.4
  };
}

const styles = {
  lightVars: {
    "--app-bg": "#f9fafb",
    "--card-bg": "#ffffff",
    "--card-border": "#e5e7eb",
    "--text": "#111827",
    "--muted": "#6b7280",
    "--soft-bg": "#e5e7eb",
    "--soft-text": "#374151",
    "--shadow": "0 6px 16px rgba(0,0,0,0.06)"
  },
  darkVars: {
    "--app-bg": "#020617",
    "--card-bg": "#0f172a",
    "--card-border": "#1e293b",
    "--text": "#f8fafc",
    "--muted": "#94a3b8",
    "--soft-bg": "#1e293b",
    "--soft-text": "#cbd5e1",
    "--shadow": "0 8px 22px rgba(0,0,0,0.35)"
  },
  page: {
    minHeight: "100vh",
    background: "var(--app-bg)",
    color: "var(--text)",
    padding: "24px 20px 110px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  },
  container: {
    maxWidth: "440px",
    margin: "0 auto"
  },
  themeButton: {
    position: "fixed",
    top: "14px",
    right: "14px",
    zIndex: 20,
    border: "1px solid var(--card-border)",
    background: "var(--card-bg)",
    color: "var(--text)",
    borderRadius: "999px",
    padding: "9px 12px",
    fontWeight: "bold",
    fontSize: "13px",
    boxShadow: "var(--shadow)"
  },
  hero: {
    background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
    color: "white",
    borderRadius: "24px",
    padding: "24px",
    marginBottom: "18px",
    boxShadow: "0 12px 30px rgba(37,99,235,0.25)"
  },
  eyebrow: {
    margin: 0,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#bfdbfe",
    fontWeight: "bold"
  },
  title: {
    margin: "8px 0 4px",
    fontSize: "30px",
    lineHeight: 1.05
  },
  subtitle: {
    margin: 0,
    color: "#dbeafe",
    lineHeight: 1.35
  },
  progressBox: {
    marginTop: "18px",
    background: "rgba(255,255,255,0.14)",
    borderRadius: "16px",
    padding: "14px"
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    marginBottom: "8px"
  },
  progressText: {
    margin: "8px 0 0",
    fontSize: "12px",
    color: "#dbeafe"
  },
  progressBarLightHero: {
    height: "10px",
    background: "rgba(255,255,255,0.25)",
    borderRadius: "999px",
    overflow: "hidden"
  },
  progressBarLight: {
    height: "10px",
    background: "var(--soft-bg)",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "8px"
  },
  progressFillBlue: {
    height: "100%",
    background: "#2563eb",
    borderRadius: "999px"
  },
  card: {
    width: "100%",
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "18px",
    padding: "16px",
    marginBottom: "12px",
    boxShadow: "var(--shadow)",
    color: "var(--text)",
    boxSizing: "border-box"
  },
  rankCard: {
    width: "100%",
    background: "var(--card-bg)",
    borderRadius: "18px",
    padding: "14px",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "var(--shadow)",
    color: "var(--text)",
    boxSizing: "border-box"
  },
  cardMainButton: {
    flex: 1,
    border: "none",
    background: "transparent",
    textAlign: "left",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "var(--text)",
    padding: 0
  },
  blueText: {
    color: "#0b82f0"
  },
  cardText: {
    margin: "6px 0 0",
    color: "var(--muted)",
    fontSize: "14px",
    lineHeight: 1.45
  },
  phaseText: {
    margin: "8px 0 0",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "bold",
    lineHeight: 1.35
  },
  label: {
    margin: "0 0 6px",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  profileName: {
    margin: "4px 0",
    color: "var(--text)",
    lineHeight: 1.15
  },
  sectionTitle: {
    color: "var(--text)",
    margin: "18px 0 12px",
    fontSize: "21px"
  },
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "14px"
  },
  quickButton: {
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "16px",
    padding: "14px 10px",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "var(--shadow)"
  },
  input: {
    width: "100%",
    border: "1px solid var(--card-border)",
    background: "var(--app-bg)",
    color: "var(--text)",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "10px",
    fontSize: "15px",
    boxSizing: "border-box"
  },
  textArea: {
    width: "100%",
    minHeight: "105px",
    border: "1px solid var(--card-border)",
    background: "var(--app-bg)",
    color: "var(--text)",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "10px",
    fontSize: "15px",
    resize: "vertical",
    boxSizing: "border-box"
  },
  primaryButton: {
    width: "100%",
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "14px",
    padding: "13px",
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "15px"
  },
  dangerButton: {
    width: "100%",
    border: "none",
    background: "#dc2626",
    color: "white",
    borderRadius: "14px",
    padding: "13px",
    fontWeight: "bold",
    fontSize: "15px"
  },
  deleteButton: {
    border: "none",
    background: "#dc2626",
    color: "white",
    borderRadius: "10px",
    padding: "8px 12px",
    fontWeight: "bold",
    fontSize: "13px",
    marginTop: "10px"
  },
  smallButton: {
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "12px",
    padding: "10px 12px",
    fontWeight: "bold",
    marginTop: "12px"
  },
  backButton: {
    border: "none",
    background: "transparent",
    color: "#60a5fa",
    fontWeight: "bold",
    marginBottom: "12px",
    fontSize: "16px"
  },
  closeButton: {
    border: "none",
    background: "var(--soft-bg)",
    color: "var(--soft-text)",
    borderRadius: "999px",
    padding: "8px 12px",
    fontWeight: "bold",
    float: "right"
  },
  commandBox: {
    background: "var(--soft-bg)",
    borderRadius: "16px",
    padding: "14px",
    margin: "12px 0",
    color: "var(--text)"
  },
  detailBlock: {
    marginTop: "14px",
    background: "var(--soft-bg)",
    borderRadius: "16px",
    padding: "14px",
    color: "var(--text)"
  },
  detailTitle: {
    margin: "0 0 8px",
    color: "var(--text)",
    fontSize: "16px"
  },
  detailList: {
    margin: 0,
    paddingLeft: "20px",
    color: "var(--text)"
  },
  detailListItem: {
    marginBottom: "7px",
    lineHeight: 1.45,
    fontSize: "14px"
  },
  warningBox: {
    marginTop: "14px",
    background: "rgba(245,158,11,0.14)",
    border: "1px solid rgba(245,158,11,0.35)",
    borderRadius: "16px",
    padding: "14px",
    color: "var(--text)"
  },
  listButton: {
    width: "100%",
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "18px",
    padding: "14px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    boxShadow: "var(--shadow)",
    color: "var(--text)",
    textAlign: "left"
  },
  notesText: {
    margin: "8px 0 0",
    color: "var(--text)",
    fontSize: "14px",
    lineHeight: 1.45,
    whiteSpace: "pre-wrap"
  },
  timelineItem: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    marginTop: "12px",
    padding: "10px",
    borderRadius: "12px",
    background: "var(--soft-bg)",
    color: "var(--text)",
    fontSize: "14px"
  },
  docCard: {
    width: "100%",
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "18px",
    padding: "16px",
    marginBottom: "12px",
    textAlign: "left",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "var(--shadow)",
    color: "var(--text)",
    textDecoration: "none",
    boxSizing: "border-box"
  },
  arrow: {
    fontSize: "30px",
    color: "#9ca3af"
  },
  currentTag: {
    margin: "8px 6px 0 0",
    color: "#ffffff",
    background: "#2563eb",
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "bold"
  },
  doneTag: {
    margin: "8px 6px 0 0",
    color: "#ffffff",
    background: "#22c55e",
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "bold"
  },
  searchWrap: {
    position: "relative",
    marginBottom: "14px"
  },
  searchInput: {
    width: "100%",
    border: "1px solid var(--card-border)",
    background: "var(--card-bg)",
    color: "var(--text)",
    borderRadius: "16px",
    padding: "13px",
    fontSize: "15px",
    boxShadow: "var(--shadow)",
    boxSizing: "border-box"
  },
  searchResults: {
    position: "absolute",
    zIndex: 30,
    top: "52px",
    left: 0,
    right: 0,
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "var(--shadow)"
  },
  searchResult: {
    width: "100%",
    border: "none",
    background: "transparent",
    color: "var(--text)",
    padding: "12px",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "3px"
  },
  bottomNav: {
    position: "fixed",
    left: "50%",
    bottom: "18px",
    transform: "translateX(-50%)",
    width: "calc(100% - 32px)",
    maxWidth: "440px",
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "24px",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "4px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    zIndex: 10,
    boxSizing: "border-box"
  },
  navButton: {
    border: "none",
    background: "transparent",
    color: "var(--muted)",
    borderRadius: "16px",
    padding: "9px 1px",
    fontWeight: "bold",
    fontSize: "9px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3px"
  },
  activeNavButton: {
    border: "none",
    background: "rgba(37,99,235,0.18)",
    color: "#60a5fa",
    borderRadius: "16px",
    padding: "9px 1px",
    fontWeight: "bold",
    fontSize: "9px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3px"
  },
  navIcon: {
    fontSize: "17px"
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
export default App;