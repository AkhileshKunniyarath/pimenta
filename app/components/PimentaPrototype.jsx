"use client";
import * as React from "react";

let prototypeAppCache = null;

const DEFAULT_TWEAKS = {
  "palette": "cardamom",
  "heroLayout": "editorial",
  "density": "medium",
  "sitemapOverlay": false
};

const DEFAULT_SITE_CONTENT = {
  "BRAND": {
    "name": "The Pimenta",
    "parent": "Haritha Farms",
    "family": "the Mathew family",
    "host": "Jacob",
    "farmEst": 1962,
    "guestsEst": 1992,
    "acres": 6.5,
    "bungalows": 4,
    "location": {
      "village": "Kadalikad",
      "region": "Kerala midlands",
      "coords": "9°52′13″N · 76°47′22″E",
      "nearestAirport": "Kochi International (90 min)",
      "nearestStation": "Aluva / Ernakulam / Kottayam (1–2 hrs)"
    },
    "contact": {
      "email": "thepimenta@gmail.com",
      "phone": "+91 94473 02347",
      "whatsapp": "+91 94473 02347",
      "web": "thepimenta.in"
    },
    "hours": "Mon–Sat 9am–6pm · Sun 10am–4pm IST",
    "responseTime": "Usually within 24 hours",
    "validUntil": "May 31, 2027"
  },
  "CURRENCY": {
    "INR": {
      "symbol": "₹",
      "rate": 1,
      "digits": 0,
      "code": "INR",
      "label": "INR ₹"
    },
    "USD": {
      "symbol": "$",
      "rate": 0.012048192771084338,
      "digits": 0,
      "code": "USD",
      "label": "USD $"
    },
    "EUR": {
      "symbol": "€",
      "rate": 0.010869565217391304,
      "digits": 0,
      "code": "EUR",
      "label": "EUR €"
    },
    "GBP": {
      "symbol": "£",
      "rate": 0.009523809523809525,
      "digits": 0,
      "code": "GBP",
      "label": "GBP £"
    }
  },
  "IMG": {
    "hero": "/prototype-assets/d7a80c01-0539-4b92-8391-fcae29be7d2a.svg",
    "heroAlt": "/prototype-assets/c4eb6607-ae25-4a2b-a673-cf0d1595bec5.svg",
    "cooking1": "/prototype-assets/d4c74a7f-32d7-4412-b857-c42494b05145.svg",
    "cooking2": "/prototype-assets/51692fec-28b8-430e-b78e-152c46f47b2f.svg",
    "cooking3": "/prototype-assets/407d1d71-045a-487c-9dea-c44def0441fa.svg",
    "cooking4": "/prototype-assets/a1326ba7-4cf0-491e-be0a-d83a2c742f5f.svg",
    "cooking5": "/prototype-assets/e18d8349-244d-4343-81e3-06b92339093a.svg",
    "truck": "/prototype-assets/77467024-af99-4528-b35e-44c4fdab6d9d.svg",
    "temple": "/prototype-assets/27fe80b9-e87e-4837-a257-8469b9d15547.svg",
    "church": "/prototype-assets/41ec284c-d4ea-46f2-895e-6cfe20978303.svg",
    "church2": "/prototype-assets/22eb5db0-369f-40b2-a091-d63c948b09c6.svg",
    "temple2": "/prototype-assets/0fc6da5b-0c9c-4864-8b74-e7726adf8eb1.svg",
    "tour1": "/prototype-assets/f8ac4fcd-67c8-491f-bb78-ab6c915e32a0.svg",
    "tour2": "/prototype-assets/7aba39cf-d0a2-4ccc-83eb-0c61038f10a5.svg",
    "tour3": "/prototype-assets/7744fb85-7656-40c3-8fb1-99a982c1630e.svg",
    "tour4": "/prototype-assets/d4cec695-2755-4512-8542-13fddf00270f.svg"
  },
  "NAV": [
    {
      "key": "home",
      "label": "Home"
    },
    {
      "key": "about",
      "label": "About Us"
    },
    {
      "key": "stay",
      "label": "Stay"
    },
    {
      "key": "experiences",
      "label": "Experiences"
    },
    {
      "key": "farm",
      "label": "The Farm"
    },
    {
      "key": "journal",
      "label": "Journal"
    },
    {
      "key": "plan",
      "label": "Plan Your Visit"
    }
  ],
  "PACKAGES": [
    {
      "id": "odyssey",
      "slug": "kerala-culinary-odyssey",
      "title": "Kerala Culinary Odyssey",
      "subtitle": "Half-day cooking demonstration · 11am to 3pm",
      "category": "day",
      "focus": "culinary",
      "nights": 0,
      "days": 1,
      "intensity": "day",
      "img": "/prototype-assets/e18d8349-244d-4343-81e3-06b92339093a.svg",
      "blurb": "Four hours in our spice garden and heritage kitchen — a demonstration, a stroll, a banana-leaf lunch.",
      "longBlurb": "If you have an afternoon to spare and a curiosity about Kerala’s plate, this is the gentlest way in. You’ll wander our spice garden with one of us, watch two classic dishes come together in the heritage kitchen, then sit down to eat what we’ve cooked, on banana leaf, at the long table.",
      "highlights": [
        "Welcome with herbal infusions",
        "Spice-garden stroll — pepper, nutmeg, cardamom in their canopies",
        "Two-dish cooking demonstration in our heritage kitchen",
        "Banana-leaf lunch with the group",
        "Recipes sent to your inbox or WhatsApp afterwards"
      ],
      "itinerary": [
        {
          "day": "11am",
          "title": "Arrive",
          "body": "Welcome with a herbal infusion and a quiet introduction to the farm."
        },
        {
          "day": "11:30am",
          "title": "Spice garden walk",
          "body": "A 45-minute wander through the bio-organic spice garden. Pepper vines, cardamom, nutmeg, vanilla, cocoa."
        },
        {
          "day": "12:30pm",
          "title": "Cooking demonstration",
          "body": "Two authentic Kerala vegetarian dishes in our heritage kitchen. Watch, photograph, or join in lightly."
        },
        {
          "day": "1:45pm",
          "title": "Banana-leaf lunch",
          "body": "Sit down to eat what we’ve cooked, in the traditional way."
        },
        {
          "day": "3pm",
          "title": "Depart",
          "body": "Leave with recipes sent to your inbox and a small jar of our garam masala."
        }
      ],
      "pricing": {
        "perPerson": 5000
      },
      "notes": "Per guest, includes lunch and bottled water. Valid until May 31, 2027.",
      "groupSize": {
        "min": 4,
        "max": 8
      },
      "bookingHours": "Advance booking required."
    },
    {
      "id": "workshop",
      "slug": "hands-on-cooking-day",
      "title": "Hands-On Cooking & Spice Farm Day",
      "subtitle": "Full-day workshop · 10am to 4pm",
      "category": "day",
      "focus": "culinary",
      "nights": 0,
      "days": 1,
      "intensity": "day",
      "img": "/prototype-assets/51692fec-28b8-430e-b78e-152c46f47b2f.svg",
      "blurb": "A whole day on the farm. Garden walk, pineapple market, truck-art yard, an auto-rickshaw village ride, and four hours in the kitchen.",
      "longBlurb": "Our most popular day for visitors passing through Kerala. The morning is for looking — the garden, the pineapple market in town, a local artist who paints lorries, an auto-rickshaw ride through villages most travellers never see. The afternoon is for cooking, with your hands, four to six vegetarian dishes, and a long lunch.",
      "highlights": [
        "Bio-organic spice farm tour",
        "Visit to a working pineapple market",
        "Meet a local artist who paints Kerala’s lorries",
        "Auto-rickshaw ride through midland villages",
        "Hands-on cooking session, 4–6 dishes",
        "Lunch at the long table"
      ],
      "itinerary": [
        {
          "day": "Before 10am",
          "title": "Arrival",
          "body": "Settle into the kitchen, meet Madhu and the team."
        },
        {
          "day": "10:00am",
          "title": "Farm walk",
          "body": "Permaculture principles, forest gardening, and the spices in their canopies."
        },
        {
          "day": "11:30am",
          "title": "Out and about",
          "body": "Pineapple market, lorry-art yard, auto-rickshaw through the villages."
        },
        {
          "day": "1:00pm",
          "title": "Hands-on cooking",
          "body": "Four to six vegetarian dishes. Stand at the chopping block, learn the order of things, taste as you go."
        },
        {
          "day": "3:00pm",
          "title": "Lunch",
          "body": "Eat what you’ve cooked, with the group."
        },
        {
          "day": "4:00pm",
          "title": "Depart",
          "body": "Back to your hotel, or onward to wherever you’re going next."
        }
      ],
      "pricing": {
        "perPerson": 7500
      },
      "notes": "Per guest, includes food and bottled water. 100% vegetarian.",
      "groupSize": {
        "min": 4,
        "max": 8
      }
    },
    {
      "id": "curry-lovers",
      "slug": "curry-lovers-retreat",
      "title": "Curry Lovers’ Retreat",
      "subtitle": "2 nights · 3 days · the short way in",
      "category": "culinary",
      "focus": "culinary",
      "nights": 2,
      "days": 3,
      "intensity": "relaxed",
      "img": "/prototype-assets/d4c74a7f-32d7-4412-b857-c42494b05145.svg",
      "blurb": "A weekend in the kitchen — six to eight tailored recipes, a pottery workshop, an ancient church, and a slow ferry on the Muvattupuzha.",
      "longBlurb": "Our shortest residential program, for guests with a long weekend and a serious appetite. You’ll cook six to eight dishes over two intensive sessions, walk the spice garden, see a few of our favourite places in the midlands, and sit down to plenty of long meals.",
      "highlights": [
        "6–8 tailored recipes across two hands-on sessions",
        "Tropical spice-garden tour",
        "Visit to a traditional potter and an ancient Syrian Christian church",
        "Pineapple market and lorry-art yard",
        "Punting boat ride on the Muvattupuzha River",
        "Our house-made bean-to-bar chocolate"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Arrival & first kitchen",
          "body": "Settle into your bungalow. Light lunch. Spice-garden tour. A spice presentation, then your first hands-on session, ending with dinner."
        },
        {
          "day": "Day 2",
          "title": "Midlands & masterclass",
          "body": "Morning visits to local temples and markets. Lunch at a neighbourhood restaurant. Afternoon three-hour cooking masterclass at the long kitchen."
        },
        {
          "day": "Day 3",
          "title": "Farewell breakfast",
          "body": "A last breakfast at the long table, recipes packed, and onward."
        }
      ],
      "pricing": {
        "solo": 33264,
        "twinWithGuest": 39501,
        "twinBothCook": 45045
      },
      "notes": "All-inclusive: AC bungalow, all meals, cooking sessions, bottled water, local excursions. Excludes taxi transfers.",
      "groupSize": {
        "max": 8
      },
      "flexibleStart": "Start any day of the week except Saturday."
    },
    {
      "id": "ttr",
      "slug": "touch-taste-relish",
      "title": "Touch, Taste & Relish",
      "subtitle": "3 nights · 4 days · the popular one",
      "category": "culinary",
      "focus": "culinary",
      "nights": 3,
      "days": 4,
      "intensity": "relaxed",
      "img": "/prototype-assets/51692fec-28b8-430e-b78e-152c46f47b2f.svg",
      "blurb": "Hands in the kitchen on three days, balanced with a river ferry, a handloom weaver, and our bean-to-bar chocolate demo.",
      "longBlurb": "If you can afford a few more days, this is the one we recommend most. The cooking sessions are properly long and the rest days have proper rests in them. You’ll see handloom weaving, watch our chocolate being made, and ride the local ferry the way the locals ride it.",
      "highlights": [
        "6–8 recipes across multiple hands-on sessions",
        "Truck-art yard, handloom weaving, rubber processing, coconut-oil making",
        "Pineapple market, farmers’ auction, artisan pottery",
        "Bean-to-bar chocolate demonstration",
        "Local river ferry ride"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Orientation",
          "body": "Arrive for a light lunch and orientation to the spice world. Culinary demonstrations and your first hands-on session."
        },
        {
          "day": "Day 2",
          "title": "Culture & craft",
          "body": "Morning tour of handloom weaving, rubber processing, and bean-to-bar chocolate. Afternoon cooking session on regional specialties."
        },
        {
          "day": "Day 3",
          "title": "Markets & masterclass",
          "body": "River ferry ride, pineapple and vegetable markets. Final cooking session. Celebratory farewell dinner."
        },
        {
          "day": "Day 4",
          "title": "Farewell",
          "body": "A final traditional breakfast and onward."
        }
      ],
      "pricing": {
        "solo": 56133,
        "twinWithGuest": 66218,
        "twinBothCook": 81081
      },
      "notes": "All-inclusive AC accommodation, all meals, 2–3 hour sessions, bottled water, all itinerary excursions.",
      "groupSize": {
        "max": 8
      }
    },
    {
      "id": "residency",
      "slug": "kerala-cooking-residency",
      "title": "Kerala Cooking Residency",
      "subtitle": "4 nights · 5 days · the classic",
      "category": "culinary",
      "focus": "culinary",
      "nights": 4,
      "days": 5,
      "intensity": "immersive",
      "img": "/prototype-assets/407d1d71-045a-487c-9dea-c44def0441fa.svg",
      "blurb": "Our flagship residency. Four full days, the techniques behind the recipes, tea plantations and spice farms in the afternoons.",
      "longBlurb": "The classic Pimenta cooking week. Long enough that we can teach you the ‘why’ behind a dish, not just the ‘how’, and short enough that you can still fit it inside an Indian holiday. You’ll cook every day, see tea country, meet our spice neighbours, and ride the river.",
      "highlights": [
        "Minimum 4 intensive hands-on sessions (≈2 hrs each)",
        "Mastery of iconic Kerala vegetarian dishes",
        "Vibrant local markets, places of worship, Muvattupuzha boat trip",
        "Lorry-decorating workshop visit",
        "Day in the tea country and on a working spice farm"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Welcome & spice revelation",
          "body": "Light lunch. Kerala’s culinary history. Introductory cooking session focused on the significance of spices."
        },
        {
          "day": "Day 2",
          "title": "Market & river",
          "body": "Hands-on session on iconic dishes. Guided tour of local markets and places of worship. A tranquil boat trip on the Muvattupuzha."
        },
        {
          "day": "Day 3",
          "title": "Industry & artistry",
          "body": "More hands-on cooking. The local food industry. Visit to a renowned lorry-decorating workshop."
        },
        {
          "day": "Day 4",
          "title": "Tea & spice symphony",
          "body": "Final intensive cooking session in the morning. Afternoon among tea plantations and on a working spice farm."
        },
        {
          "day": "Day 5",
          "title": "Farewell",
          "body": "A final traditional breakfast."
        }
      ],
      "pricing": {
        "solo": 75953,
        "twinWithGuest": 88011,
        "twinBothCook": 109009
      },
      "notes": "All-inclusive. Eco-friendly AC garden bungalow, 4 hands-on sessions, all meals, all excursions, unlimited bottled water.",
      "groupSize": {
        "max": 8
      }
    },
    {
      "id": "adventure",
      "slug": "kerala-cooking-adventure",
      "title": "Kerala Cooking Adventure",
      "subtitle": "6 nights · 7 days · the long, layered one",
      "category": "culinary",
      "focus": "culinary",
      "nights": 6,
      "days": 7,
      "intensity": "immersive",
      "img": "/prototype-assets/a1326ba7-4cf0-491e-be0a-d83a2c742f5f.svg",
      "blurb": "A full week. Six recipes per session, tea plantations, river days, our bean-to-bar workshop, and afternoons you won’t want to leave.",
      "longBlurb": "Six nights gives us room to teach properly. You’ll cook a minimum of six recipes in each two-hour session, see tea country and the lorry-artists, ride the Muvattupuzha, visit a working farmers’ market, and spend an afternoon learning how chocolate is made from the bean up.",
      "highlights": [
        "Choose demonstration or hands-on per session",
        "Minimum 6 recipes per 2-hour session",
        "Bean-to-bar chocolate workshop (full process)",
        "Tea plantation, lorry-decorating workshop, local food industry",
        "Muvattupuzha boat cruise, farmers’ market"
      ],
      "itinerary": [
        {
          "day": "Sun",
          "title": "Welcome",
          "body": "Arrival, light lunch, history of Kerala cuisine, first cooking session, dinner."
        },
        {
          "day": "Mon",
          "title": "Markets & river",
          "body": "Local markets, places of worship, river cruise. Two-hour cooking session, dinner showcasing your work."
        },
        {
          "day": "Tue",
          "title": "Farmers’ market",
          "body": "Farmers’ market visit, then back to the kitchen for more masterpieces."
        },
        {
          "day": "Wed",
          "title": "Tea country",
          "body": "Day trip into the tea country, evening at the long table."
        },
        {
          "day": "Thu",
          "title": "Chocolate workshop",
          "body": "Bean-to-bar process. Afternoon cooking session."
        },
        {
          "day": "Fri",
          "title": "Lorry art & spice farms",
          "body": "Lorry-decorating workshop, then a spice-farm tour. Farewell dinner."
        },
        {
          "day": "Sat",
          "title": "Farewell",
          "body": "Final breakfast and onward."
        }
      ],
      "pricing": {
        "onRequest": true
      },
      "notes": "Pricing on request — we tailor the program to your group size and preferences.",
      "groupSize": {
        "max": 8
      }
    },
    {
      "id": "splendour",
      "slug": "culinary-splendour",
      "title": "Culinary Splendour in Kerala",
      "subtitle": "10 nights · 11 days · the masterclass",
      "category": "culinary",
      "focus": "culinary",
      "nights": 10,
      "days": 11,
      "intensity": "immersive",
      "img": "/prototype-assets/e18d8349-244d-4343-81e3-06b92339093a.svg",
      "blurb": "Our deepest program. South Indian and North Indian vegetarian, Ayurvedic principles, the Western Ghats, the backwaters, and 10 nights to absorb it.",
      "longBlurb": "Eleven days is enough time to actually change the way you cook. Mornings are for the science of spice. Afternoons go to dosa, idli, dal, paneer, breads. Days off go to tea, cardamom, the backwaters, and Ayurvedic cooking principles. You leave with technique, not recipes.",
      "highlights": [
        "Both South Indian and North Indian vegetarian repertoires",
        "Ayurvedic cooking principles",
        "Bean-to-bar chocolate workshop (full process)",
        "Tea, cardamom and spice plantations in the Western Ghats",
        "Signature backwaters cruise with a traditional lunch",
        "Kerala Thali, paneer specialties, dal, regional breads, dosa, idli"
      ],
      "itinerary": [
        {
          "day": "Days 1–3",
          "title": "Foundations",
          "body": "Orientation, the spice world, South Indian breakfast staples (dosa, idli), essential spice blends."
        },
        {
          "day": "Days 4–6",
          "title": "Markets & deep dives",
          "body": "Local markets, complex vegetable preparations, traditional rices, the Kerala Thali. Bean-to-bar workshop."
        },
        {
          "day": "Days 7–9",
          "title": "Western Ghats & North India",
          "body": "Tea and spice plantations. Paneer specialties, dals, regional breads."
        },
        {
          "day": "Day 10",
          "title": "Backwater grandeur",
          "body": "Scenic day trip to the backwaters for a private boat cruise and farewell dinner."
        },
        {
          "day": "Day 11",
          "title": "Farewell",
          "body": "Final breakfast and onward, with a small certificate."
        }
      ],
      "pricing": {
        "solo": 210000,
        "twinBothTravel": 262647
      },
      "notes": "All-inclusive AC accommodation, all meals, all cooking sessions, scheduled excursions.",
      "groupSize": {
        "max": 6
      },
      "bestTime": "February–May and July–September are the most vibrant."
    },
    {
      "id": "taste",
      "slug": "taste-of-kerala",
      "title": "Taste of Kerala",
      "subtitle": "2 nights · 3 days · a short cultural sampler",
      "category": "cultural",
      "focus": "cultural",
      "nights": 2,
      "days": 3,
      "intensity": "relaxed",
      "img": "/prototype-assets/77467024-af99-4528-b35e-44c4fdab6d9d.svg",
      "blurb": "A long weekend in the midlands. The pineapple market, an ancient church, the lorry-painters, and our bungalows for two quiet nights.",
      "longBlurb": "If you’re short on time but want more than sightseeing, this is our gentlest introduction. Two nights at The Pimenta, the village tour we send everyone on, an ancient church, the pineapple market, and the lorry-art tradition that has come to define the midlands for many of our guests.",
      "highlights": [
        "Spice Garden Bungalow accommodation",
        "Midland Surprises tour",
        "Pineapple market visit",
        "Ancient Syrian Christian church",
        "Kerala lorry-art tradition"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Arrival",
          "body": "Settle into your bungalow. Refreshing lunch. The Midland Surprises Tour through the surrounding landscape."
        },
        {
          "day": "Day 2",
          "title": "Discoveries",
          "body": "Breakfast. Local market. Pineapple market and ancient church. The lorry-art tradition."
        },
        {
          "day": "Day 3",
          "title": "Farewell",
          "body": "Hearty breakfast and onward."
        }
      ],
      "pricing": {
        "solo": 25707,
        "twin": 32604
      },
      "notes": "Includes 2 nights, breakfast/light lunch/dinner for 2 days, all itinerary trips, filtered water."
    },
    {
      "id": "kerala-feel",
      "slug": "kerala-feel",
      "title": "Kerala Feel",
      "subtitle": "3 nights · 4 days · nature, culture, cuisine",
      "category": "cultural",
      "focus": "cultural",
      "nights": 3,
      "days": 4,
      "intensity": "relaxed",
      "img": "/prototype-assets/7aba39cf-d0a2-4ccc-83eb-0c61038f10a5.svg",
      "blurb": "A tea plantation, an ancient church, a temple, the river ferry, the pineapple market — and a cooking class on the third afternoon if you want one.",
      "longBlurb": "Three nights of slow looking. Tea plantation in the morning, river ferry after lunch, lorry-painting factory in between. The third afternoon is yours — take a cooking class, take an Ayurvedic massage, or take a nap.",
      "highlights": [
        "Spice Garden Bungalow accommodation",
        "Verdant tea plantation visit",
        "Lorry-painting factory tour",
        "Ancient Syrian Christian church and Hindu temples",
        "River ride, pineapple market, terracotta artisans",
        "Hands-on vegetarian cooking class (Day 3)"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Arrival & garden",
          "body": "Light lunch. Walk through the midlands and aromatic plantations. Dinner showcasing Kerala flavours."
        },
        {
          "day": "Day 2",
          "title": "Tea trails",
          "body": "Visit a verdant tea plantation. Charming village walk. Lorry-painting factory."
        },
        {
          "day": "Day 3",
          "title": "Heritage & kitchen",
          "body": "Ancient church and Hindu temples. River ride, pineapple market, terracotta artisans. Afternoon cooking class or Ayurvedic massage."
        },
        {
          "day": "Day 4",
          "title": "Farewell",
          "body": "Morning meal before departure."
        }
      ],
      "pricing": {
        "solo": 44174,
        "twin": 58907
      },
      "notes": "Includes accommodation, daily meals, all transport in itinerary, one cooking class, filtered water."
    },
    {
      "id": "heart",
      "slug": "discover-heart-of-kerala",
      "title": "Discover the Heart of Kerala",
      "subtitle": "4 nights · 5 days · balanced cultural week",
      "category": "cultural",
      "focus": "mixed",
      "nights": 4,
      "days": 5,
      "intensity": "relaxed",
      "img": "/prototype-assets/7744fb85-7656-40c3-8fb1-99a982c1630e.svg",
      "blurb": "Tea trails, sacred sites, terracotta artisans, the backwaters — four nights at the long table and one optional cooking session.",
      "longBlurb": "Our most popular cultural week. The balance is what people love — a tea plantation, an ancient Syrian Christian church and a Hindu temple, a 3-hour backwater cruise with a packed picnic, terracotta artisans, the pineapple market, and one cooking session if you want one.",
      "highlights": [
        "Four nights at The Pimenta",
        "Tea plantation walk",
        "Syrian Christian Church and Hindu temple",
        "Three-hour backwater cruise with packed picnic",
        "Terracotta artisans, river ride, pineapple market",
        "Optional Ayurvedic massage and cooking class"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Arrival & midlands",
          "body": "Spice Garden Bungalow check-in. Light lunch. Guided walking tour of the midlands. Dinner at The Pimenta."
        },
        {
          "day": "Day 2",
          "title": "Tea trails",
          "body": "Scenic drive to a tea plantation. Walk the gardens. Afternoon: shopping in town, or interactive vegetarian cooking session."
        },
        {
          "day": "Day 3",
          "title": "Sacred & artisanal",
          "body": "Syrian Christian Church and Hindu temple. Light lunch, village walk. Terracotta artisans. River ride, pineapple market. Optional Ayurvedic massage."
        },
        {
          "day": "Day 4",
          "title": "Backwaters",
          "body": "Breakfast with local produce. Countryside drive to the backwaters. 3-hour cruise with packed picnic lunch. Evening dinner."
        },
        {
          "day": "Day 5",
          "title": "Farewell",
          "body": "Breakfast before departure."
        }
      ],
      "pricing": {
        "solo": 64548,
        "twin": 80872
      },
      "notes": "Includes 4 nights, daily meals, all listed transport, filtered water. Tips and Ayurveda treatments excluded."
    },
    {
      "id": "monsoon",
      "slug": "monsoon-wellness",
      "title": "Monsoon Wellness Holiday",
      "subtitle": "Tailor-made · 5 to 21 nights · June to October",
      "category": "wellness",
      "focus": "wellness",
      "nights": null,
      "days": null,
      "intensity": "custom",
      "img": "/prototype-assets/c4eb6607-ae25-4a2b-a673-cf0d1595bec5.svg",
      "blurb": "Yoga, Ayurvedic cooking, partner Ayurvedic massages at nearby centres, and the long monsoon afternoons that make Kerala famous.",
      "longBlurb": "Between June and October the rains come and the farm changes character. Mootil pazham fruits everywhere, the pepper greens up, the air is washed clean. This is the right time for an Ayurvedic week with us — yoga in the mornings, cooking lessons focused on dosha balance, treatments at the trusted Ayurvedic centres we’ve worked with for thirty years, and afternoons on the veranda watching the rain.",
      "highlights": [
        "Personalized Ayurvedic cooking sessions",
        "Yoga (daily, gentle)",
        "Ayurvedic massages at nearby partner centres",
        "Library of Ayurveda, yoga and healthy-living books",
        "Verandas, rain, nature walks",
        "Tailored stays of 5 to 21 days"
      ],
      "itinerary": [
        {
          "day": "Mornings",
          "title": "Yoga & teaching",
          "body": "A gentle yoga session, followed by Ayurvedic cooking guidance — understanding doshas, balancing meals, the rasas."
        },
        {
          "day": "Afternoons",
          "title": "Treatments",
          "body": "Customised Ayurvedic massages and therapies at a partner centre, ten minutes away. Or rest, read, walk."
        },
        {
          "day": "Evenings",
          "title": "Long table",
          "body": "Ayurvedically informed dinner, conversation, the library, the rain."
        }
      ],
      "pricing": {
        "onRequest": true
      },
      "notes": "Tailored entirely to your needs and length of stay. June 1 to October 31 only.",
      "season": "Monsoon only (June 1 – October 31)"
    },
    {
      "id": "tailor",
      "slug": "tailor-made",
      "title": "Tailor-Made Holiday",
      "subtitle": "We build it around you",
      "category": "tailor",
      "focus": "mixed",
      "nights": null,
      "days": null,
      "intensity": "custom",
      "img": "/prototype-assets/f8ac4fcd-67c8-491f-bb78-ab6c915e32a0.svg",
      "blurb": "Tell us what you love to eat and what you want to see. We’ll build the rest.",
      "longBlurb": "Some guests arrive with very specific things in mind — a son who loves chocolate, a mother who wants Ayurveda, a partner who only wants temples, three days extra to do nothing at all. We’re used to it. Write to us with what you’d love, and we’ll write back with a plan and a price.",
      "highlights": [
        "Stays from 2 to 21 nights",
        "Any combination of cooking, culture, wellness, nothing-at-all",
        "Family-friendly variations on every program",
        "NRI homecoming programs (kids meeting amma’s Kerala for the first time)"
      ],
      "itinerary": [
        {
          "day": "Step 1",
          "title": "Tell us",
          "body": "Write with dates, group, dietary needs, and what you’d like the trip to feel like."
        },
        {
          "day": "Step 2",
          "title": "We sketch",
          "body": "Within a day, a proposed program and a price."
        },
        {
          "day": "Step 3",
          "title": "We refine",
          "body": "One or two rounds of conversation. Then a 25% deposit confirms."
        }
      ],
      "pricing": {
        "onRequest": true
      },
      "notes": "We answer every enquiry personally, usually within a day."
    }
  ],
  "ROOMS": [
    {
      "id": "bungalow-1",
      "name": "Bungalow No. 1 — The Pepper",
      "blurb": "High ceilings, exposed brick, twin beds, a private veranda over the pepper vines.",
      "sqft": 320,
      "guests": 2,
      "img": "/prototype-assets/d4c74a7f-32d7-4412-b857-c42494b05145.svg",
      "features": [
        "Twin beds",
        "Private veranda",
        "Solar hot water",
        "Air conditioning",
        "En-suite shower"
      ]
    },
    {
      "id": "bungalow-2",
      "name": "Bungalow No. 2 — The Cardamom",
      "blurb": "Tucked behind the spice grove. Writing desk, soft towels, the morning birds.",
      "sqft": 320,
      "guests": 2,
      "img": "/prototype-assets/51692fec-28b8-430e-b78e-152c46f47b2f.svg",
      "features": [
        "Twin beds",
        "Writing desk",
        "Solar hot water",
        "Air conditioning",
        "En-suite shower"
      ]
    },
    {
      "id": "bungalow-3",
      "name": "Bungalow No. 3 — The Cocoa",
      "blurb": "Closest to the kitchen. Best choice for early cooking-program starts.",
      "sqft": 320,
      "guests": 2,
      "img": "/prototype-assets/407d1d71-045a-487c-9dea-c44def0441fa.svg",
      "features": [
        "Twin beds",
        "Closest to the kitchen",
        "Solar hot water",
        "Air conditioning"
      ]
    },
    {
      "id": "bungalow-4",
      "name": "Bungalow No. 4 — The Nutmeg",
      "blurb": "The quiet one. Deepest into the trees. Hammock on the veranda.",
      "sqft": 320,
      "guests": 2,
      "img": "/prototype-assets/a1326ba7-4cf0-491e-be0a-d83a2c742f5f.svg",
      "features": [
        "Twin beds",
        "Veranda hammock",
        "Solar hot water",
        "Air conditioning"
      ]
    },
    {
      "id": "main-house",
      "name": "Main-house rooms (budget / long stay)",
      "blurb": "First-floor rooms in the main house, with a shared veranda. For budget travellers and long stays.",
      "sqft": null,
      "guests": 2,
      "img": "/prototype-assets/d4cec695-2755-4512-8542-13fddf00270f.svg",
      "features": [
        "Shared veranda",
        "Some en-suite, some shared bath",
        "Wireless internet",
        "Long-stay friendly"
      ]
    }
  ],
  "STAY_MODES": [
    {
      "id": "bnb",
      "title": "Bed & Breakfast",
      "blurb": "Just the bungalow and a generous breakfast. Days yours to wander. Two-night minimum.",
      "img": "/prototype-assets/7744fb85-7656-40c3-8fb1-99a982c1630e.svg",
      "pricing": {
        "single": 7000,
        "double": 9500
      },
      "perNight": true,
      "inclusions": [
        "Breakfast",
        "Air-conditioned room",
        "Wireless internet"
      ],
      "notes": "We’ll recommend nearby restaurants for lunch and dinner."
    },
    {
      "id": "fullboard",
      "title": "Stay + All Meals (Full Board)",
      "blurb": "All three meals at the long kitchen table. Thoughtfully prepared, tailored to your diet. Bespoke pricing.",
      "img": "/prototype-assets/e18d8349-244d-4343-81e3-06b92339093a.svg",
      "pricing": {
        "single": {
          "from": 8500,
          "to": 11500
        },
        "double": {
          "from": 12000,
          "to": 16500
        }
      },
      "perNight": true,
      "inclusions": [
        "AC double or twin-bedded room",
        "Breakfast, a light lunch, dinner",
        "Fresh lime soda, coffee, tea",
        "Bottled water throughout"
      ],
      "notes": "Pricing tailored to dietary preference (vegan, traditional, Ayurvedic prep/recovery, etc).",
      "bespoke": true
    },
    {
      "id": "whole",
      "title": "Whole Property",
      "blurb": "All four bungalows, the long kitchen, the family’s time, and the 6.5 acres. Three-night minimum.",
      "img": "/prototype-assets/d7a80c01-0539-4b92-8391-fcae29be7d2a.svg",
      "pricing": {
        "onRequest": true
      },
      "notes": "Up to 8 guests. For families, writing retreats, small celebrations."
    }
  ],
  "ACTIVITIES": [
    {
      "group": "Heritage",
      "items": [
        {
          "title": "Old Syrian Christian churches",
          "body": "Some of Kerala’s oldest parishes — the St Thomas tradition."
        },
        {
          "title": "Hindu temples and festivals",
          "body": "Including the arattu when the river floods up to the temple."
        },
        {
          "title": "Lorry-decorating workshop",
          "body": "How a Kerala lorry gets its face. A favourite afternoon."
        }
      ]
    },
    {
      "group": "Land & industry",
      "items": [
        {
          "title": "Rubber plantation & rubber-band factory",
          "body": "The least-touristed hour any of our guests have."
        },
        {
          "title": "Pineapple market",
          "body": "Loud, fragrant, and over by 11am."
        },
        {
          "title": "Artisan chocolate (bean-to-bar)",
          "body": "A neighbour, 40 minutes away, who makes some of South India’s best."
        }
      ]
    },
    {
      "group": "Water",
      "items": [
        {
          "title": "Backwater cruise",
          "body": "Three hours on the kind of boat the locals use, picnic lunch."
        },
        {
          "title": "Muvattupuzha river ferry",
          "body": "The local commuter ferry, not the houseboat circus."
        }
      ]
    },
    {
      "group": "Wellness",
      "items": [
        {
          "title": "Ayurvedic treatments",
          "body": "At trusted partner centres ten minutes away."
        },
        {
          "title": "Tea plantations",
          "body": "A drive into the Western Ghats, a walk among the rows."
        }
      ]
    },
    {
      "group": "Craft & shopping",
      "items": [
        {
          "title": "Clay-pot and terracotta",
          "body": "Visits, and an optional one-day pottery workshop."
        },
        {
          "title": "Local herbs & spice shop",
          "body": "Quality local product, packed to international standards."
        },
        {
          "title": "Thodupuzha & Muvattupuzha towns",
          "body": "Snack-making, tailors, fabric, shoes — the things tourists never see."
        }
      ]
    }
  ],
  "JOURNAL_POSTS": [
    {
      "id": "j1",
      "kind": "story",
      "title": "How a pepper vine borrows a tree — and what we’ve learned from it",
      "date": "Mar 2026",
      "img": "/prototype-assets/407d1d71-045a-487c-9dea-c44def0441fa.svg",
      "excerpt": "An essay on patience, borrowed structure, and why we still grow Tellicherry."
    },
    {
      "id": "j2",
      "kind": "press",
      "title": "Featured in Condé Nast Traveller India — ‘Slow Kerala’",
      "date": "Feb 2026",
      "img": "/prototype-assets/27fe80b9-e87e-4837-a257-8469b9d15547.svg",
      "excerpt": "A two-page spread on the midlands and why travellers keep returning."
    },
    {
      "id": "j3",
      "kind": "story",
      "title": "The rubber-band factory no one on the tourist route knows about",
      "date": "Jan 2026",
      "img": "/prototype-assets/f8ac4fcd-67c8-491f-bb78-ab6c915e32a0.svg",
      "excerpt": "Why a detour to a band factory became the best hour of our guest’s week."
    },
    {
      "id": "j4",
      "kind": "press",
      "title": "Responsible Travel — recommended stay",
      "date": "Nov 2025",
      "img": "/prototype-assets/7744fb85-7656-40c3-8fb1-99a982c1630e.svg",
      "excerpt": "Our listing on ResponsibleTravel.com and what sustainable tourism means to us."
    },
    {
      "id": "j5",
      "kind": "story",
      "title": "Garam masala is not a recipe, it is a season",
      "date": "Oct 2025",
      "img": "/prototype-assets/d4c74a7f-32d7-4412-b857-c42494b05145.svg",
      "excerpt": "On why the spice blend you bought in London is probably last winter’s."
    },
    {
      "id": "j6",
      "kind": "photos",
      "title": "Monsoon, week three — a photo log",
      "date": "Jul 2025",
      "img": "/prototype-assets/c4eb6607-ae25-4a2b-a673-cf0d1595bec5.svg",
      "excerpt": "Twelve photographs from twelve consecutive rainy mornings on the farm."
    }
  ],
  "REVIEWS": [
    {
      "name": "Jaina S.",
      "where": "Tripadvisor",
      "date": "Dec 2019",
      "stars": 5,
      "short": "Extended my 2 nights to 3 without a second thought.",
      "long": "Jacob made this experience fantastic — from the amazing cooking classes, to the guided tours around the area and taking me out for local delicacies."
    },
    {
      "name": "Sally F.",
      "where": "Tripadvisor",
      "date": "Dec 2022",
      "stars": 5,
      "short": "The day trips give you a slice of Kerala life.",
      "long": "Jacob is a super sweet and attentive host who really tailors the program around the food you want to learn how to cook."
    },
    {
      "name": "Jamie H.",
      "where": "Tripadvisor",
      "date": "Mar 2023",
      "stars": 5,
      "short": "Don’t think twice — this is the real Kerala.",
      "long": "Jacob is a phenomenal host, chef, teacher, neighbourhood guide. A truly caring individual is behind The Pimenta."
    },
    {
      "name": "Brian R.",
      "where": "Tripadvisor",
      "date": "Jan 2019",
      "stars": 5,
      "short": "An Indian foodie paradise.",
      "long": "I enjoyed the combination of morning markets, trying different restaurants for lunch and evening cooking. Jacob sources everything locally."
    },
    {
      "name": "Corinne C.",
      "where": "Tripadvisor",
      "date": "Mar 2023",
      "stars": 5,
      "short": "We’d have stayed longer.",
      "long": "The bungalows are surrounded by beautiful nature. We would have loved to stay longer and cook more with Jacob."
    }
  ],
  "FAQS": [
    {
      "q": "Where exactly is The Pimenta?",
      "a": "We sit on 6.5 acres of spice gardens in Kadalikad, between Thodupuzha and Muvattupuzha in Kerala’s midlands. About 90 minutes from Kochi International Airport."
    },
    {
      "q": "How do I get there?",
      "a": "Easiest: a driver from Kochi (we’ll arrange one). Trains to Aluva, Ernakulam, or Kottayam also work — we’ll pick you up from either."
    },
    {
      "q": "Is your food only vegetarian?",
      "a": "Yes. Everything we cook and teach is vegetarian or vegan. It’s how we eat, it’s what we know best, and it’s what Kerala’s traditional plate looks like."
    },
    {
      "q": "Are the cooking sessions hands-on?",
      "a": "Very. Madhu handles the prep so you focus on the craft — the tempering, the layering, the tasting. You’ll cook 4–6 dishes a day on most programs."
    },
    {
      "q": "I have dietary restrictions. Is that OK?",
      "a": "Yes. Vegan, gluten-free, no-nuts, Jain — just tell us when you enquire. Our whole kitchen is already vegetarian."
    },
    {
      "q": "What’s the best time to visit?",
      "a": "October to March is dry and pleasant. June to October is monsoon — dramatic, green, and the right time for our Ayurvedic Wellness program. February–May and July–September are when the cooking programs feel most alive."
    },
    {
      "q": "Can I stay without doing a cooking program?",
      "a": "Of course — our Bed & Breakfast and Stay + All Meals options are for guests who want only the farm, the meals, and the quiet."
    },
    {
      "q": "Do you have wifi?",
      "a": "We do. Not great wifi, but enough wifi."
    },
    {
      "q": "Can we rent the whole property?",
      "a": "Yes — all four bungalows, up to 8 guests. Popular with families, writing retreats, and small celebrations. Three-night minimum."
    },
    {
      "q": "Are you eco-friendly?",
      "a": "Since the early 1990s we’ve been chemical-free. The farm runs partly on solar (including hot water), and we employ locally. Greenery, space, and silence are the only luxuries we promise."
    },
    {
      "q": "Are kids welcome?",
      "a": "All ages welcome on Tailor-Made and Whole Property stays. Multi-night cooking residencies work best for ages 14 and up."
    }
  ],
  "TODAY_PANEL": {
    "date": "Tuesday, 14 March",
    "weather": "28°C · light rain expected by 4pm",
    "growing": [
      "Pepper, harvesting",
      "Mootil pazham, fruiting",
      "Vanilla, flowering",
      "Turmeric, dormant"
    ],
    "cooking": [
      "Avial",
      "Erissery (roasted-coconut style)",
      "Inji puli",
      "Pal payasam"
    ],
    "fromFarm": "9 of 11 ingredients, this morning"
  },
  "ABOUT": {
    "eyebrow": "About Us",
    "title": "Rediscovering responsible tourism and culinary retreats with our story",
    "intro": "Welcome to Haritha Farms, a sanctuary of sustainable tourism and culinary retreats in the heart of Kerala's midlands.",
    "sections": [
      {
        "title": "Haritha Farms",
        "body": "Established in 1962 by the Mathew family, Haritha Farms began as a rubber plantation and grew into a living enclave for green living. The family turned away from pesticides and chemical fertilizers, choosing a forest garden rich with crops and medicinal plants instead."
      },
      {
        "title": "Pioneers of eco-agri-tourism",
        "body": "In 1992, the Mathew family opened their doors to day visitors and became early pioneers of eco-agri-tourism in southern India. Over time, the stay expanded to include The Pimenta, a cluster of independent bungalows named after the Portuguese word for black pepper."
      },
      {
        "title": "The Pimenta experience",
        "body": "Set in the foothills of the Western Ghats, The Pimenta offers four bungalows facing a verdant tropical garden, a communal dining area, and a kitchen where guests can get an inside look at authentic Indian cooking."
      },
      {
        "title": "Comfortable and intimate",
        "body": "Guests can slow down on private verandas or gather in the bohemian-style shared spaces. We keep the setting intimate, comfortable, and rooted in the rhythms of a real Kerala homestead, with practical comforts including Wi-Fi across the property."
      },
      {
        "title": "Culinary and cultural immersion",
        "body": "Jacob Mathew has hosted and shaped experiences here for over 25 years. Alongside healthy South Indian vegetarian cuisine and hands-on cookery courses, stays can include tea plantations, local businesses, boat trips on the Muvattupuzha River, markets, and places of worship across Kerala's cultural landscape."
      }
    ],
    "teamTitle": "The people behind the stay",
    "teamBody": "Our team includes Jacob Mathew, Mrs. Mathew, Madhu Shankar, Ranjeet Mathew Jacob, and Ancy P. Anto in the back office. Together they create the feeling of being welcomed by a Keralite family rather than processed by a hotel.",
    "teamMembers": [
      "Jacob Mathew",
      "Mrs. Mathew",
      "Madhu Shankar",
      "Ranjeet Mathew Jacob",
      "Ancy P. Anto"
    ],
    "ctaTitle": "Step off the tourist trail.",
    "ctaBody": "If you seek a thoughtful blend of comfort, sustainability, culture, and cuisine, The Pimenta at Haritha Farms is ready to help you plan a more personal Kerala stay."
  },
  "TERMS": {
    "title": "Terms and Conditions",
    "lastUpdated": "June 23, 2026",
    "intro": "The following terms and conditions apply to all bookings made with The Pimenta Homestay and form the contract between the host and the guest. By making a booking, you confirm that you have read the website and the details of the program you are booking, understand the risks associated with it, and have the authority to accept these conditions on behalf of yourself and your party. The contract is established once we accept any payment towards the booking or issue our confirmation or invoice, whichever happens first.",
    "acknowledgement": "It is assumed that you have read the terms and conditions and the details of each program before booking. By completing a booking, you confirm that you understand and accept everything stated here. If you have any questions or concerns, please contact us before confirming your booking.",
    "sections": [
      {
        "title": "General booking terms",
        "body": "All bookings are subject to these terms and conditions. By booking with The Pimenta Homestay, you agree to the terms outlined here."
      },
      {
        "title": "Experience packages and culinary retreats",
        "body": "When booking our experience packages or culinary retreats, a non-refundable deposit of 30% of the total booking value is required at the time of booking. This deposit will only be refunded if the booking is not accepted by us for any reason or if, due to unforeseen circumstances, we are unable to provide the course you booked. Once availability is confirmed, payment details will be shared and immediate payment is required. A proper receipt will be issued after payment is received. The remaining balance is payable upon arrival."
      },
      {
        "title": "Stay bookings",
        "body": "For bookings involving a stay or a stay with food, a deposit equal to one night's accommodation must be paid in advance. If you fail to arrive on the booked day, the deposit will be forfeited. If, for any reason, we are unable to provide accommodation on the booked day, the booking amount will be refunded. For multi-day stays, you must confirm on arrival and make payment for the remaining days to secure the rest of the booking."
      },
      {
        "title": "International guest requirements",
        "body": "Foreign travellers must provide a copy of the front page of their passport, along with a contact phone number, mailing address, and emergency contact details. You are responsible for holding a valid visa on arrival and for the full duration of your stay. If you do not hold a valid visa, accommodation will be denied."
      },
      {
        "title": "Indian guest requirements",
        "body": "Indian guests must provide a valid photo identification card for all occupants on arrival, along with a valid address and contact phone number. A working contact number and emergency contact person are required."
      },
      {
        "title": "Travel insurance",
        "body": "It is a condition of booking that you arrange adequate holiday insurance covering medical expenses, personal baggage, personal accidents, loss or damage to property, cancellation or curtailment, personal liability, legal expenses, and emergencies."
      },
      {
        "title": "Governing law",
        "body": "The contract, including these terms and conditions, is governed by the laws of India."
      }
    ]
  }
};

const RESOURCE_MAP = {
  "img_hero": "/prototype-assets/d7a80c01-0539-4b92-8391-fcae29be7d2a.svg",
  "img_tour1": "/prototype-assets/f8ac4fcd-67c8-491f-bb78-ab6c915e32a0.svg",
  "img_tour2": "/prototype-assets/7aba39cf-d0a2-4ccc-83eb-0c61038f10a5.svg",
  "img_heroAlt": "/prototype-assets/c4eb6607-ae25-4a2b-a673-cf0d1595bec5.svg",
  "img_cooking1": "/prototype-assets/d4c74a7f-32d7-4412-b857-c42494b05145.svg",
  "img_church2": "/prototype-assets/22eb5db0-369f-40b2-a091-d63c948b09c6.svg",
  "img_tour3": "/prototype-assets/7744fb85-7656-40c3-8fb1-99a982c1630e.svg",
  "img_cooking2": "/prototype-assets/51692fec-28b8-430e-b78e-152c46f47b2f.svg",
  "img_truck": "/prototype-assets/77467024-af99-4528-b35e-44c4fdab6d9d.svg",
  "img_church": "/prototype-assets/41ec284c-d4ea-46f2-895e-6cfe20978303.svg",
  "img_cooking5": "/prototype-assets/e18d8349-244d-4343-81e3-06b92339093a.svg",
  "img_tour4": "/prototype-assets/d4cec695-2755-4512-8542-13fddf00270f.svg",
  "img_temple2": "/prototype-assets/0fc6da5b-0c9c-4864-8b74-e7726adf8eb1.svg",
  "img_temple": "/prototype-assets/27fe80b9-e87e-4837-a257-8469b9d15547.svg",
  "img_cooking3": "/prototype-assets/407d1d71-045a-487c-9dea-c44def0441fa.svg",
  "img_cooking4": "/prototype-assets/a1326ba7-4cf0-491e-be0a-d83a2c742f5f.svg"
};

function createPrototypeApp(content) {
  if (prototypeAppCache) {
    return prototypeAppCache;
  }

  window.__resources = {
    ...(window.__resources || {}),
    ...RESOURCE_MAP,
  };
  window.__TWEAKS__ = window.__TWEAKS__ || DEFAULT_TWEAKS;

  const { useState, useEffect, useRef, useMemo } = React;

{
const SITE_CONTENT = content || DEFAULT_SITE_CONTENT;
const CURRENCY = SITE_CONTENT.CURRENCY || {};
const DEFAULT_NAV = [{"key":"home","label":"Home"},{"key":"about","label":"About Us"},{"key":"stay","label":"Stay"},{"key":"experiences","label":"Experiences"},{"key":"farm","label":"The Farm"},{"key":"journal","label":"Journal"},{"key":"plan","label":"Plan Your Visit"}];

function normalizeNav(items) {
  const source = Array.isArray(items) ? items.filter(Boolean) : [];
  const keyed = new Map(
    source
      .filter((item) => item && typeof item.key === "string")
      .map((item) => [item.key, item]),
  );

  const merged = DEFAULT_NAV.map((item) => ({
    ...item,
    ...(keyed.get(item.key) || {}),
  }));

  const extras = source.filter(
    (item) => item && !DEFAULT_NAV.some((defaultItem) => defaultItem.key === item.key),
  );

  return [...merged, ...extras];
}

function formatPrice(inr, currency) {
  if (inr == null) return null;
  const c = CURRENCY[currency] || CURRENCY.INR;
  if (!c) return null;
  const v = inr * c.rate;
  let r;
  if (c.code === "INR") r = Math.round(v / 100) * 100;
  else r = Math.round(v / 5) * 5;
  return c.symbol + r.toLocaleString(c.code === "INR" ? "en-IN" : "en-US");
}

window.DATA = {
  ...SITE_CONTENT,
  ABOUT: SITE_CONTENT.ABOUT || {},
  NAV: normalizeNav(SITE_CONTENT.NAV),
  CURRENCY,
  formatPrice,
};
}

{
// Small visual primitives shared across pages.

const { useState, useEffect, useRef, useMemo } = React;

// Currency-aware price component. Use everywhere for prices.
function Price({ inr, fallback, currency, prefix, suffix, style }) {
  const cur = currency || "INR";
  if (inr == null) return <span style={style}>{fallback || "On request"}</span>;
  const formatted = window.DATA.formatPrice(inr, cur);
  return <span style={style}>{prefix || ""}{formatted}{suffix || ""}</span>;
}

function Img({ src, alt, className, style, ratio }) {
  const [err, setErr] = useState(false);
  const r = ratio || "4/3";
  const base = { aspectRatio: r, width: "100%", objectFit: "cover", display: "block" };
  if (err || !src) {
    return (
      <div className={"img-fallback " + (className || "")} style={{ ...base, ...style }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {alt || "image"}
        </span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt || ""}
      onError={() => setErr(true)}
      className={className}
      style={{ ...base, ...style }}
    />
  );
}

function Section({ children, id, style, className }) {
  return (
    <section id={id} className={"pad-section " + (className || "")} style={{ padding: "120px 0", ...style }}>
      {children}
    </section>
  );
}

function Container({ children, width, style, className }) {
  return (
    <div
      className={className}
      style={{
        maxWidth: width || 1240,
        margin: "0 auto",
        padding: "0 40px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, color, style }) {
  return (
    <div
      className="tracked"
      style={{
        color: color || "var(--muted)",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        ...style,
      }}
    >
      <span style={{ width: 18, height: 1, background: "currentColor", display: "inline-block" }} />
      {children}
    </div>
  );
}

function Stars({ n = 5, size = 14, color }) {
  return (
    <span style={{ color: color || "var(--accent)", letterSpacing: 2, fontSize: size }}>
      {"★".repeat(n)}
      <span style={{ color: "var(--rule)" }}>{"★".repeat(5 - n)}</span>
    </span>
  );
}

function Btn({ children, onClick, variant, as, href, style }) {
  const Tag = as || "button";
  const cls = "btn " + (variant === "accent" ? "btn-accent" : variant === "ghost" ? "btn-ghost" : "");
  return (
    <Tag className={cls} onClick={onClick} href={href} style={style}>
      {children}
      <span style={{ display: "inline-block", transition: "transform .2s" }}>→</span>
    </Tag>
  );
}

// Floating "always-there" Request-to-Book CTA bar (primary goal = drive enquiries)
function BookingBar({ onBook, hidden }) {
  if (hidden) return null;
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: 22,
        zIndex: 40,
        background: "var(--ink)",
        color: "var(--paper)",
        borderRadius: 999,
        padding: "10px 10px 10px 22px",
        display: "flex",
        alignItems: "center",
        gap: 20,
        boxShadow: "0 20px 40px -20px rgba(0,0,0,.35)",
        fontSize: 14,
      }}
    >
      <span className="mono" style={{ opacity: 0.7, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
        Kerala · midlands
      </span>
      <span style={{ opacity: 0.3 }}>|</span>
      <span>From ₹7,400 / night · direct only</span>
      <button
        onClick={onBook}
        style={{
          background: "var(--paper)",
          color: "var(--ink)",
          border: "none",
          padding: "10px 18px",
          borderRadius: 999,
          fontWeight: 500,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Request to book →
      </button>
    </div>
  );
}

// 3-column image strip with alternating sizes — editorial magazine rhythm
function EditorialStrip({ items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 0.9fr", gap: 20 }}>
      {items.slice(0, 3).map((it, i) => (
        <div key={i} style={{ paddingTop: i === 1 ? 0 : i === 0 ? 40 : 80 }}>
          <Img src={it.img} alt={it.alt} ratio={i === 1 ? "4/5" : "3/4"} />
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, letterSpacing: "0.08em" }}>
            {String(i + 1).padStart(2, "0")} — {it.caption}
          </div>
        </div>
      ))}
    </div>
  );
}

window.UI = { Img, Section, Container, Eyebrow, Stars, Btn, BookingBar, EditorialStrip, Price };

}

{
// Top nav + mobile nav + footer

const { useState: useStateN } = React;

function TopNav({ page, setPage, onBook, showSitemap, setShowSitemap }) {
  const [scrolled, setScrolled] = useStateN(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: scrolled ? "rgba(243,237,226,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
        transition: "all .25s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "18px 40px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => setPage("home")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--paper)",
              fontFamily: "'Fraunces', serif",
              fontSize: 20,
              fontStyle: "italic",
              lineHeight: 1,
              paddingBottom: 2,
            }}
          >
            P
          </div>
          <div style={{ lineHeight: 1.05 }}>
            <div className="serif" style={{ fontSize: 18, letterSpacing: "-0.01em" }}>The Pimenta</div>
            <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 2 }}>
              Farm 1962 · Guests 1992
            </div>
          </div>
        </div>

        <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {window.DATA.NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => setPage(n.key)}
              style={{
                background: "transparent",
                border: "none",
                padding: "8px 14px",
                color: page === n.key ? "var(--ink)" : "var(--ink-2)",
                fontSize: 14,
                fontWeight: page === n.key ? 500 : 400,
                cursor: "pointer",
                position: "relative",
              }}
            >
              {n.label}
              {page === n.key && (
                <span
                  style={{
                    position: "absolute",
                    left: 14,
                    right: 14,
                    bottom: 2,
                    height: 1,
                    background: "var(--accent)",
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", alignItems: "center" }}>
          <button
            onClick={() => setShowSitemap(!showSitemap)}
            title="Sitemap overlay"
            style={{
              background: "transparent",
              border: "1px solid var(--rule)",
              color: "var(--muted)",
              padding: "8px 12px",
              borderRadius: 999,
              cursor: "pointer",
              fontSize: 12,
            }}
            className="mono"
          >
            ⌘ Sitemap
          </button>
          <button
            onClick={onBook}
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              border: "none",
              padding: "10px 18px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Request to book
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ setPage, onBook }) {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 80 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 40px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 60, marginBottom: 80 }}>
          <div>
            <div className="serif" style={{ fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Come stay a <span className="italic-serif">while</span>.
            </div>
            <p style={{ color: "rgba(243,237,226,0.6)", fontSize: 14, lineHeight: 1.7, marginTop: 20, maxWidth: 340 }}>
              Six and a half acres of spice gardens in the midlands of Kerala. Jacob, Madhu,
              a long dining table, and whatever's ripe this week.
            </p>
            <button
              onClick={onBook}
              style={{
                marginTop: 30,
                background: "var(--accent-soft)",
                color: "var(--ink)",
                border: "none",
                padding: "14px 22px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Plan your visit →
            </button>
          </div>

          {[
            { title: "Visit", items: [["About Us", "about"], ["Stay", "stay"], ["Experiences", "experiences"], ["The Farm", "farm"], ["Plan Your Visit", "plan"]] },
            { title: "Read", items: [["Journal", "journal"], ["Press", "journal"], ["Photos", "journal"], ["Recipes", "journal"]] },
            { title: "Connect", items: [["Request to book", null], ["+91 94473 02347", null], ["thepimenta@gmail.com", null], ["Tripadvisor", null]] },
          ].map((col) => (
            <div key={col.title}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(243,237,226,0.5)", marginBottom: 20 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {col.items.map(([label, key]) => (
                  <li key={label}>
                    <button
                      onClick={() => key ? setPage(key) : onBook()}
                      style={{ background: "transparent", border: "none", color: "var(--paper)", cursor: "pointer", padding: 0, fontSize: 15, textAlign: "left" }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(243,237,226,0.15)", paddingTop: 30, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", color: "rgba(243,237,226,0.5)", fontSize: 12 }} className="mono">
          <span>© 2026 The Pimenta · Haritha Farms · Kadalikad, Kerala · thepimenta@gmail.com</span>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span>+91 94473 02347 · Mon–Sat 9am–6pm IST</span>
            <button
              onClick={() => setPage("terms")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--paper)",
                cursor: "pointer",
                padding: 0,
                fontSize: 12,
                textDecoration: "underline",
                textUnderlineOffset: 4,
                fontFamily: "inherit",
              }}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Full-screen sitemap overlay — shows the proposed IA visually
function SitemapOverlay({ open, onClose, setPage }) {
  if (!open) return null;
  const sections = [
    { title: "Stay", sub: ["Rooms & Bungalows", "Whole Property", "Bed & Breakfast", "Stay + Food"], key: "stay", note: "Merged from: Rooms, Whole Property, B&B, Stay & Food" },
    { title: "Experiences", sub: ["Cooking Residencies", "Cultural Retreats", "Day Workshops", "Online Cooking", "Tailor-Made"], key: "experiences", note: "NEW hub — replaces 10+ orphan package pages" },
    { title: "The Farm", sub: ["Our Story (Jacob & family)", "Food Philosophy", "Activities & Workshops", "Local Landmarks"], key: "farm", note: "Merged from: About, Food, Activities" },
    { title: "Journal", sub: ["Stories", "Press", "Photos", "Videos", "Recipes"], key: "journal", note: "Merged from: Blog, Media, Gallery" },
    { title: "Plan Your Visit", sub: ["Getting Here", "What to Expect", "FAQ", "For NRIs", "Terms"], key: "plan", note: "Merged from: FAQ, NRI, Terms" },
    { title: "Request to Book", sub: ["Dates & Guests", "Pick a Package", "Personal Details", "Confirmation"], key: "book", note: "NEW — replaces enquiry-only model" },
  ];
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(31,26,21,0.96)",
        zIndex: 60,
        overflow: "auto",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 50 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent-soft)", marginBottom: 14 }}>
              Proposed information architecture
            </div>
            <h1 className="serif" style={{ color: "var(--paper)", fontSize: 64, margin: 0, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              From <span className="italic-serif">ten</span> scattered pages<br />
              to <span style={{ color: "var(--accent-soft)" }}>six</span> clear sections.
            </h1>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "1px solid rgba(243,237,226,0.3)", color: "var(--paper)", padding: "10px 16px", borderRadius: 999, cursor: "pointer", fontSize: 13 }} className="mono">
            ✕ Close
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {sections.map((s, i) => (
            <div
              key={s.title}
              onClick={() => { setPage(s.key); onClose(); }}
              style={{
                border: "1px solid rgba(243,237,226,0.15)",
                background: "rgba(243,237,226,0.03)",
                borderRadius: 4,
                padding: 28,
                cursor: "pointer",
                color: "var(--paper)",
                transition: "background .2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(243,237,226,0.07)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(243,237,226,0.03)"}
            >
              <div className="mono" style={{ fontSize: 11, color: "var(--accent-soft)", letterSpacing: "0.16em", marginBottom: 12 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="serif" style={{ fontSize: 32, letterSpacing: "-0.01em", marginBottom: 18 }}>{s.title}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                {s.sub.map((sub) => (
                  <li key={sub} style={{ fontSize: 14, color: "rgba(243,237,226,0.75)", paddingLeft: 14, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 1, background: "var(--accent-soft)" }} />
                    {sub}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(243,237,226,0.1)", fontSize: 12, color: "rgba(243,237,226,0.5)" }} className="mono">
                {s.note}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60, padding: 30, border: "1px dashed rgba(243,237,226,0.25)", borderRadius: 4, color: "rgba(243,237,226,0.75)", fontSize: 14, lineHeight: 1.7, maxWidth: 900 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--accent-soft)", letterSpacing: "0.16em", marginBottom: 12, textTransform: "uppercase" }}>
            What we removed
          </div>
          Ten sibling package URLs (Curry Lovers Retreat, Touch-Taste-Relish, 4N5D Residency, 6N7D Adventure, 7N8D Malabar, 11-Day Immersion, Taste of Kerala, Soul of Kerala, Heart of Kerala, Spice Farm Day Workshop) now live inside <em>Experiences</em> as filterable cards. Three "Other Options" orphans (Bed & Breakfast, Stay & Food, Whole Property) consolidate into <em>Stay</em>. Blog + Media + Gallery become one <em>Journal</em>. NRI + Terms fold into <em>Plan Your Visit</em>. Net result: <strong>25+ URLs → 6 top-level sections</strong>, every one reachable in two clicks.
        </div>
      </div>
    </div>
  );
}

window.Nav = { TopNav, Footer, SitemapOverlay };

}

{
// Home page — warm-personal voice, real content, default Editorial hero

const { Img, Section, Container, Eyebrow, Stars, Btn, Price } = window.UI;
const { IMG, PACKAGES, REVIEWS, TODAY_PANEL, BRAND, CURRENCY } = window.DATA;

// ════════════════════════════════════════════════════════════════════
// HEROES — Editorial is the chosen one; the rest live behind Tweaks.
// ════════════════════════════════════════════════════════════════════

function Hero({ onBook, layout, setPage }) {
  if (layout === "postcard")     return <HeroPostcard onBook={onBook} />;
  if (layout === "menu")         return <HeroMenu onBook={onBook} />;
  if (layout === "topographic")  return <HeroTopographic onBook={onBook} />;
  if (layout === "poster")       return <HeroPoster onBook={onBook} />;
  if (layout === "cinematic")    return <HeroCinematic onBook={onBook} />;
  if (layout === "split")        return <HeroSplit onBook={onBook} setPage={setPage} />;
  return <HeroEditorial onBook={onBook} setPage={setPage} />;
}

function HeroEditorial({ onBook, setPage }) {
  return (
    <Container style={{ paddingTop: 40, paddingBottom: 80 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, alignItems: "end" }}>
        <div style={{ paddingBottom: 40 }}>
          <Eyebrow>Kerala midlands · Farm 1962 · Guests 1992</Eyebrow>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 18, lineHeight: 1.7 }}>
            9°52′13″N · 76°47′22″E<br />
            Kadalikad, Kerala<br />
            6.5 acres, four bungalows
          </div>
        </div>
        <Img src={IMG.hero} alt="The Pimenta farm" ratio="3/4" />
        <div style={{ paddingBottom: 80 }}>
          <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>No. 01</div>
          <div className="serif" style={{ fontSize: 22, lineHeight: 1.35 }}>
            "The day starts with tea. What happens next is <em>mostly your decision</em>."
          </div>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 14, letterSpacing: "0.1em" }}>
            — Jacob, host
          </div>
        </div>
      </div>

      <h1
        className="serif"
        style={{
          fontSize: "clamp(80px, 13vw, 220px)",
          lineHeight: 0.85,
          margin: "40px 0 20px",
          letterSpacing: "-0.035em",
          textAlign: "center",
        }}
      >
        Cook. <span className="italic-serif" style={{ color: "var(--accent)" }}>Stay</span>. Wander.
      </h1>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, borderTop: "1px solid var(--rule)", paddingTop: 22, gap: 30, flexWrap: "wrap" }}>
        <div style={{ fontSize: 15, color: "var(--ink-2)", maxWidth: 520, lineHeight: 1.6 }}>
          A small, family-run homestay on 6.5 acres of spice gardens in Kerala&rsquo;s midlands.
          Hands-on vegetarian cooking, cultural day-trips, four private bungalows, and afternoons quiet enough to finish a novel.
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Btn onClick={onBook} variant="accent">Request to book</Btn>
          <Btn onClick={() => setPage("experiences")} variant="ghost">See experiences</Btn>
        </div>
      </div>
    </Container>
  );
}

function HeroCinematic({ onBook }) {
  return (
    <div style={{ position: "relative", minHeight: 720, overflow: "hidden" }}>
      <Img src={IMG.hero} alt="The Pimenta farm" ratio="auto" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", aspectRatio: "auto" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,26,21,0.2) 0%, rgba(31,26,21,0.55) 80%)" }} />
      <Container style={{ position: "relative", zIndex: 2, paddingTop: 160, paddingBottom: 80, color: "var(--paper)" }}>
        <Eyebrow color="rgba(243,237,226,0.85)">Kerala midlands · Farm 1962</Eyebrow>
        <h1 className="serif" style={{ fontSize: "clamp(64px, 9vw, 128px)", lineHeight: 0.95, margin: "24px 0 30px", letterSpacing: "-0.03em", maxWidth: 1000 }}>
          A spice garden,<br />
          a <span className="italic-serif">long</span> kitchen table,<br />
          a week that <span className="italic-serif">slows</span>.
        </h1>
        <button onClick={onBook} style={{ background: "var(--paper)", color: "var(--ink)", border: "none", padding: "18px 28px", borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
          Request to book →
        </button>
      </Container>
    </div>
  );
}

function HeroSplit({ onBook, setPage }) {
  return (
    <Container style={{ paddingTop: 60, paddingBottom: 80 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <Eyebrow>Kerala midlands · Farm 1962 · Guests 1992</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(56px, 6vw, 96px)", lineHeight: 0.98, margin: "26px 0 28px", letterSpacing: "-0.025em" }}>
            Come cook.<br />Come <span className="italic-serif">stay</span>.<br />Come back.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: 480, marginBottom: 32 }}>
            Six and a half acres of pepper, coffee and cocoa in the Kerala midlands — an hour from Kochi but a
            century from anywhere. Vegetarian kitchen. Family-run since 1962.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <Btn onClick={onBook} variant="accent">Request to book</Btn>
            <Btn onClick={() => setPage("experiences")} variant="ghost">See experiences</Btn>
          </div>
        </div>
        <Img src={IMG.cooking1} alt="hands in a spice kitchen" ratio="4/5" />
      </div>
    </Container>
  );
}

// (the four "extra" heroes — Postcard / Menu / Topographic / Poster — kept
//  available for the Tweaks panel but use the same warm-personal copy.)
function HeroPostcard({ onBook }) {
  const cards = [
    { src: IMG.cooking1, cap: "Madhu, kitchen, Tues morning", rot: -6, x: 0, y: 60, w: 280 },
    { src: IMG.hero, cap: "The farm · monsoon, week 3", rot: 3, x: 220, y: 0, w: 340 },
    { src: IMG.temple, cap: "Koothattukulam · arattu day", rot: -3, x: 540, y: 100, w: 260 },
    { src: IMG.tour2, cap: "Munnar drive, 2pm", rot: 5, x: 760, y: 20, w: 280 },
  ];
  return (
    <Container style={{ paddingTop: 60, paddingBottom: 120, position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 14px", border: "1px dashed var(--accent)", color: "var(--accent)", borderRadius: 999, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace" }}>
            ◉ Posted from Kerala
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(60px, 7vw, 116px)", lineHeight: 0.95, margin: "26px 0 24px", letterSpacing: "-0.03em" }}>
            Dear <span className="italic-serif">friend</span>,<br />
            come for a <span className="italic-serif">week</span>.<br />
            You&rsquo;ll write home.
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: 460, marginBottom: 28 }}>
            Postcards from the farm — what&rsquo;s growing, what we&rsquo;re cooking, where we drove yesterday.
          </p>
          <Btn onClick={onBook} variant="accent">Request to book</Btn>
        </div>
        <div style={{ position: "relative", height: 460 }}>
          {cards.map((c, i) => (
            <div key={i} style={{ position: "absolute", top: c.y, left: c.x, width: c.w, transform: `rotate(${c.rot}deg)`, background: "var(--paper)", padding: 12, paddingBottom: 38, boxShadow: "0 16px 40px -16px rgba(0,0,0,0.25)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <Img src={c.src} alt={c.cap} ratio="4/5" />
              <div className="italic-serif" style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 10, textAlign: "center" }}>{c.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

function HeroMenu({ onBook }) {
  const dishes = [
    { name: "Avial", note: "the seven-vegetable monsoon classic", from: "garden, this morning" },
    { name: "Erissery", note: "pumpkin & black-eyed pea, roasted coconut", from: "Madhu's amma's recipe" },
    { name: "Inji puli", note: "ginger-tamarind, sharp & sweet", from: "ginger, behind the kitchen" },
    { name: "Pal payasam", note: "rice & jaggery, long-cooked", from: "two hours on low" },
  ];
  return (
    <Container style={{ paddingTop: 60, paddingBottom: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 70, alignItems: "start" }}>
        <div style={{ position: "sticky", top: 100 }}>
          <Eyebrow>Today · Kerala midlands</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(60px, 7vw, 120px)", lineHeight: 0.95, margin: "24px 0 30px", letterSpacing: "-0.03em" }}>
            Today&rsquo;s <span className="italic-serif">table</span>.
          </h1>
          <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.7, maxWidth: 380, marginBottom: 28 }}>
            Vegetarian, every day. The menu changes by the river, by the rain, by what looks good at the market.
          </p>
          <Btn onClick={onBook} variant="accent">Request a seat</Btn>
        </div>
        <div style={{ border: "1px solid var(--ink)", padding: "44px 50px", background: "var(--paper-2)", position: "relative" }}>
          <div style={{ position: "absolute", top: -1, left: 20, background: "var(--paper-2)", padding: "0 12px", color: "var(--accent)", fontSize: 11, letterSpacing: "0.2em", fontFamily: "'IBM Plex Mono', monospace" }}>
            ✦  THE  LONG  TABLE  ✦
          </div>
          <div style={{ display: "grid", gap: 28, marginTop: 8 }}>
            {dishes.map((d, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "30px 1fr auto", gap: 18, alignItems: "baseline", borderBottom: i < dishes.length - 1 ? "1px dotted var(--rule)" : "none", paddingBottom: 22 }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="serif" style={{ fontSize: 28, letterSpacing: "-0.01em", lineHeight: 1.1 }}>{d.name}</div>
                  <div className="italic-serif" style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 4 }}>{d.note}</div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)", textAlign: "right", maxWidth: 140, lineHeight: 1.5 }}>{d.from}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

function HeroTopographic({ onBook }) {
  return (
    <Container style={{ paddingTop: 50, paddingBottom: 90 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div className="mono tracked" style={{ color: "var(--accent)" }}>09°52′13″N · 76°47′22″E</div>
          <h1 className="serif" style={{ fontSize: "clamp(64px, 8vw, 132px)", lineHeight: 0.92, margin: "22px 0 26px", letterSpacing: "-0.03em" }}>
            Find us on<br />the <span className="italic-serif">map</span>.<br />Then forget it.
          </h1>
          <Btn onClick={onBook} variant="accent">Plot your visit</Btn>
        </div>
        <div style={{ position: "relative", aspectRatio: "1/1", background: "var(--paper-2)", border: "1px solid var(--rule)", overflow: "hidden" }}>
          <svg viewBox="0 0 500 500" style={{ width: "100%", height: "100%", display: "block" }}>
            {Array.from({ length: 14 }).map((_, i) => {
              const r = 60 + i * 24;
              return <circle key={i} cx="280" cy="220" r={r} fill="none" stroke="var(--rule)" strokeWidth="0.7" opacity={0.7 - i * 0.035} />;
            })}
            <path d="M 0 380 C 80 360 140 410 220 380 C 300 350 340 390 420 360 C 460 345 500 350 500 350" stroke="var(--accent-soft)" strokeWidth="2.5" fill="none" opacity="0.6" />
            <g transform="translate(280,220)">
              <circle r="32" fill="none" stroke="var(--accent)" strokeWidth="1" />
              <circle r="6" fill="var(--accent)" />
              <text x="44" y="-30" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--accent)" letterSpacing="1">THE PIMENTA</text>
            </g>
          </svg>
        </div>
      </div>
    </Container>
  );
}

function HeroPoster({ onBook }) {
  return (
    <div style={{ position: "relative", padding: "80px 0 120px", overflow: "hidden" }}>
      <Container>
        <div style={{ position: "relative" }}>
          <div className="serif" style={{ fontSize: "clamp(120px, 22vw, 360px)", lineHeight: 0.78, letterSpacing: "-0.05em", color: "var(--ink)", margin: 0 }}>SLOW</div>
          <div className="italic-serif" style={{ fontSize: "clamp(120px, 22vw, 360px)", lineHeight: 0.78, letterSpacing: "-0.04em", color: "var(--accent)", margin: 0, marginLeft: "10%", marginTop: "-0.18em" }}>kerala</div>
          <div className="serif" style={{ fontSize: "clamp(120px, 22vw, 360px)", lineHeight: 0.78, letterSpacing: "-0.05em", color: "var(--ink)", margin: 0, marginLeft: "4%", marginTop: "-0.12em" }}>FOOD.</div>
          <div style={{ position: "absolute", top: "8%", right: "4%", width: 220, transform: "rotate(6deg)", boxShadow: "0 24px 50px -20px rgba(0,0,0,0.4)" }}>
            <Img src={IMG.cooking2} alt="cooking" ratio="3/4" />
          </div>
        </div>
        <Btn onClick={onBook} variant="accent" style={{ marginTop: 60 }}>Request to book</Btn>
      </Container>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// Sections
// ════════════════════════════════════════════════════════════════════

function MarqueeStrip() {
  const items = ["Vegetarian kitchen", "Spice gardens", "Backwaters", "Tea country", "Temple towns", "Bean-to-bar chocolate", "Lorry art", "Pepper & cocoa", "Family-run since 1962"];
  const loop = [...items, ...items];
  return (
    <div className="marquee-wrap" style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", padding: "20px 0", background: "var(--paper-2)" }}>
      <div className="marquee">
        {loop.map((it, i) => (
          <span key={i} className="serif" style={{ fontSize: 32, letterSpacing: "-0.01em", color: "var(--ink-2)", display: "inline-flex", alignItems: "center", gap: 48 }}>
            {it}
            <span style={{ color: "var(--accent)", fontSize: 16 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TodayPanel() {
  const t = TODAY_PANEL;
  return (
    <Section style={{ padding: "80px 0 40px" }}>
      <Container>
        <div style={{ border: "1px solid var(--rule)", background: "var(--paper-2)", padding: 40, display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr", gap: 50, alignItems: "start" }}>
          <div>
            <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 12 }}>Today on the farm</div>
            <div className="serif" style={{ fontSize: 28, letterSpacing: "-0.01em" }}>{t.date}</div>
            <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, letterSpacing: "0.08em" }}>{t.weather}</div>
          </div>
          <div>
            <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 12 }}>In the garden</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 7, fontSize: 14, color: "var(--ink-2)" }}>
              {t.growing.map(g => <li key={g}>· {g}</li>)}
            </ul>
          </div>
          <div>
            <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 12 }}>On the table</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 7, fontSize: 14, color: "var(--ink-2)" }}>
              {t.cooking.map(g => <li key={g}>· {g}</li>)}
            </ul>
          </div>
          <div>
            <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 12 }}>From the farm</div>
            <div className="serif italic-serif" style={{ fontSize: 22, color: "var(--accent)", lineHeight: 1.3 }}>{t.fromFarm}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, lineHeight: 1.55 }}>
              The rest from neighbours within 1km. We don&rsquo;t buy out of season.
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function IntroBlock({ setPage }) {
  return (
    <Section>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 100, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 100 }}>
            <Eyebrow>A note from the family</Eyebrow>
            <div className="serif" style={{ fontSize: 48, lineHeight: 1.08, marginTop: 20, letterSpacing: "-0.02em" }}>
              We built this<br />as a <span className="italic-serif">place</span>,<br />not a product.
            </div>
          </div>
          <div style={{ fontSize: 18, lineHeight: 1.75, color: "var(--ink-2)", fontFamily: "'Fraunces', serif", fontWeight: 300 }}>
            <p style={{ margin: "0 0 22px" }}>
              Our family planted the first trees on Haritha Farms in 1962. By the early 1990s we&rsquo;d torn up the rubber
              monoculture, sworn off chemicals, and replanted with pepper, coconut, cocoa, vanilla, turmeric and the
              medicinal plants that grow well in our soil. We opened the kitchen to travellers in 1992.
            </p>
            <p style={{ margin: "0 0 22px" }}>
              There are four bungalows, one long kitchen, and 6.5 acres of garden. No pool, no spa, no buffet.
              You come to cook, to walk, to eat — vegetarian, the way Kerala has always eaten — and, if we&rsquo;ve done
              our job, to leave lighter than you arrived.
            </p>
            <p style={{ margin: "0 0 32px" }}>
              If that sounds right, write to us. We answer every enquiry ourselves, usually within a day.
            </p>
            <button onClick={() => setPage("farm")} style={{ background: "transparent", border: "none", borderBottom: "1px solid var(--ink)", paddingBottom: 4, color: "var(--ink)", fontSize: 15, cursor: "pointer" }}>
              Read our story →
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ThreePillars() {
  const pillars = [
    { no: "01", title: "Cook", img: IMG.cooking3, body: "Vegetarian, hands-on, recipe-led. Madhu handles prep so you focus on technique. Four to eight dishes a day on most programs." },
    { no: "02", title: "Stay", img: IMG.tour2, body: "Four private bungalows amidst pepper and cocoa. Solar hot water, air conditioning, good-enough wifi. No pool, by design." },
    { no: "03", title: "Wander", img: IMG.truck, body: "Backwaters, temple towns, lorry-art yards, tea country. A driver who knows the back roads. As much, or as little, as you like." },
  ];
  return (
    <Section>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
          {pillars.map((p) => (
            <div key={p.no}>
              <Img src={p.img} alt={p.title} ratio="4/3" />
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 24 }}>
                <div className="mono" style={{ fontSize: 13, color: "var(--accent)" }}>{p.no}</div>
                <div className="serif" style={{ fontSize: 42, letterSpacing: "-0.02em" }}>{p.title}</div>
              </div>
              <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, marginTop: 10, maxWidth: 340 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ExperienceShowcase({ setPage, onBook, currency, openPackage }) {
  const featured = PACKAGES.filter(p => ["residency", "ttr", "adventure", "taste", "heart", "workshop"].includes(p.id));
  return (
    <Section style={{ background: "var(--paper-2)", padding: "140px 0" }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 30 }}>
          <div>
            <Eyebrow>Experiences</Eyebrow>
            <h2 className="serif" style={{ fontSize: 72, lineHeight: 1, margin: "20px 0 0", letterSpacing: "-0.025em", maxWidth: 720 }}>
              Eleven ways<br />to spend <span className="italic-serif">a week</span> with us.
            </h2>
          </div>
          <div style={{ maxWidth: 420 }}>
            <p style={{ color: "var(--ink-2)", lineHeight: 1.6, margin: "0 0 20px" }}>
              From a half-day cooking demonstration to an eleven-day immersion, plus a monsoon Ayurvedic program from
              June to October. Every program is hands-on, vegetarian, and capped at eight guests.
            </p>
            <button onClick={() => setPage("experiences")} style={{ background: "var(--ink)", color: "var(--paper)", border: "none", padding: "12px 20px", borderRadius: 999, fontSize: 14, cursor: "pointer" }}>
              See all eleven →
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {featured.map((p, i) => {
            const minPrice = p.pricing.solo ?? p.pricing.perPerson;
            return (
              <div key={p.id} style={{ cursor: "pointer" }} onClick={() => openPackage(p.slug)}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Img src={p.img} alt={p.title} ratio="4/5" />
                  <div style={{ position: "absolute", top: 14, left: 14, background: "var(--paper)", color: "var(--ink)", padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 500 }} className="mono">
                    {p.nights === 0 ? "Day" : p.nights + "N / " + p.days + "D"}
                  </div>
                </div>
                <div style={{ marginTop: 18 }}>
                  <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 8 }}>
                    {p.focus === "culinary" ? "Culinary" : p.focus === "cultural" ? "Cultural" : p.focus === "wellness" ? "Wellness" : "Mixed"}
                    {minPrice ? <> · from <Price inr={minPrice} currency={currency} /></> : null}
                  </div>
                  <div className="serif" style={{ fontSize: 26, letterSpacing: "-0.01em", lineHeight: 1.15, marginBottom: 10 }}>
                    {p.title}
                  </div>
                  <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: 0 }}>{p.blurb}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function ReviewsSection() {
  const [idx, setIdx] = useState(0);
  const r = REVIEWS[idx];
  return (
    <Section style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
          <div>
            <Eyebrow color="var(--accent-soft)">What guests say</Eyebrow>
            <div className="serif" style={{ fontSize: 60, lineHeight: 1.05, marginTop: 24, letterSpacing: "-0.025em" }}>
              Every review,<br />
              written without<br />
              being <span className="italic-serif" style={{ color: "var(--accent-soft)" }}>asked</span>.
            </div>
            <div style={{ marginTop: 40, display: "flex", gap: 30, alignItems: "center" }}>
              <div>
                <div className="serif" style={{ fontSize: 48, lineHeight: 1 }}>5.0</div>
                <Stars n={5} size={16} color="var(--accent-soft)" />
                <div className="mono" style={{ fontSize: 11, color: "rgba(243,237,226,0.6)", marginTop: 6 }}>
                  Tripadvisor · 120+ reviews
                </div>
              </div>
              <div style={{ width: 1, height: 60, background: "rgba(243,237,226,0.2)" }} />
              <div>
                <div className="serif" style={{ fontSize: 48, lineHeight: 1 }}>98%</div>
                <div className="mono" style={{ fontSize: 11, color: "rgba(243,237,226,0.6)", marginTop: 6 }}>
                  Would return
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="serif italic-serif" style={{ fontSize: 32, lineHeight: 1.4, color: "var(--paper)", minHeight: 180 }}>
              &ldquo;{r.long}&rdquo;
            </div>
            <div style={{ marginTop: 30, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(243,237,226,0.15)", paddingTop: 24 }}>
              <div>
                <div style={{ fontSize: 15 }}>{r.name}</div>
                <div className="mono" style={{ fontSize: 11, color: "rgba(243,237,226,0.6)", marginTop: 4, letterSpacing: "0.1em" }}>
                  {r.where} · {r.date}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    style={{
                      width: 32, height: 32, borderRadius: "50%",
                      border: i === idx ? "1px solid var(--accent-soft)" : "1px solid rgba(243,237,226,0.2)",
                      background: i === idx ? "var(--accent-soft)" : "transparent",
                      color: i === idx ? "var(--ink)" : "var(--paper)",
                      cursor: "pointer", fontSize: 12,
                    }}
                    className="mono"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function BigBookingCTA({ onBook }) {
  return (
    <Section style={{ background: "var(--accent)", color: "var(--paper)", padding: "160px 0" }}>
      <Container>
        <div style={{ textAlign: "center" }}>
          <Eyebrow color="rgba(243,237,226,0.7)">Direct bookings only</Eyebrow>
          <div className="serif" style={{ fontSize: "clamp(60px, 9vw, 160px)", lineHeight: 0.9, margin: "30px 0 40px", letterSpacing: "-0.035em" }}>
            Write to <span className="italic-serif">us</span>.<br />We&rsquo;ll write <span className="italic-serif">back</span>.
          </div>
          <button onClick={onBook} style={{ background: "var(--paper)", color: "var(--ink)", border: "none", padding: "20px 32px", borderRadius: 999, fontSize: 16, fontWeight: 500, cursor: "pointer" }}>
            Request to book →
          </button>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 30, color: "rgba(243,237,226,0.7)" }}>
            Usually a reply within 24 hours · written personally
          </div>
        </div>
      </Container>
    </Section>
  );
}

function HomePage({ setPage, onBook, heroLayout, currency, openPackage }) {
  return (
    <div>
      <Hero onBook={onBook} layout={heroLayout} setPage={setPage} />
      <MarqueeStrip />
      <IntroBlock setPage={setPage} />
      <ThreePillars />
      <ExperienceShowcase setPage={setPage} onBook={onBook} currency={currency} openPackage={openPackage} />
      <ReviewsSection />
      <BigBookingCTA onBook={onBook} />
    </div>
  );
}

window.Pages = window.Pages || {};
window.Pages.HomePage = HomePage;

}

{
// About Us — backend-driven brand story page

const { Section: SectionA, Container: ContA, Eyebrow: EyebrowA, Btn: BtnA, Img: ImgA } = window.UI;
const { ABOUT: ABOUTA, BRAND: BRANDA, IMG: IMGA } = window.DATA;

function AboutPage({ onBook, setPage }) {
  const about = ABOUTA || {};
  const sections = about.sections || [];
  const teamMembers = about.teamMembers || [];

  return (
    <div>
      <SectionA style={{ padding: "60px 0 40px" }}>
        <ContA>
          <EyebrowA>{about.eyebrow || "About Us"}</EyebrowA>
          <h1 className="serif" style={{ fontSize: "clamp(60px, 9vw, 132px)", lineHeight: 0.94, margin: "18px 0 20px", letterSpacing: "-0.03em", maxWidth: 980 }}>
            {about.title || "A family-run Kerala stay rooted in land, food, and hospitality."}
          </h1>
          <p style={{ maxWidth: 760, margin: 0, fontSize: 18, color: "var(--ink-2)", lineHeight: 1.75 }}>
            {about.intro || "Welcome to The Pimenta."}
          </p>
        </ContA>
      </SectionA>

      <SectionA style={{ padding: "20px 0 90px" }}>
        <ContA>
          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 40, alignItems: "start" }}>
            <div>
              <ImgA src={IMGA.hero} alt={BRANDA?.name || "The Pimenta"} ratio="4/5" />
            </div>
            <div style={{ display: "grid", gap: 22 }}>
              {sections.slice(0, 2).map((section, index) => (
                <div key={section.title || index} style={{ borderTop: "1px solid var(--rule)", paddingTop: 18 }}>
                  <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="serif" style={{ fontSize: 32, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
                    {section.title}
                  </div>
                  <p style={{ margin: "12px 0 0", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.8 }}>
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ContA>
      </SectionA>

      <SectionA style={{ background: "var(--paper-2)", padding: "110px 0" }}>
        <ContA>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {sections.slice(2).map((section, index) => (
              <div key={section.title || index} style={{ border: "1px solid var(--rule)", padding: 28, background: "var(--paper)" }}>
                <div className="serif" style={{ fontSize: 30, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                  {section.title}
                </div>
                <p style={{ margin: "14px 0 0", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.75 }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </ContA>
      </SectionA>

      <SectionA style={{ padding: "100px 0" }}>
        <ContA>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "start" }}>
            <div>
              <EyebrowA>{about.teamTitle || "Our Team"}</EyebrowA>
              <h2 className="serif" style={{ fontSize: 54, lineHeight: 1, letterSpacing: "-0.025em", margin: "18px 0 24px" }}>
                The people behind<br />
                <span className="italic-serif">The Pimenta</span>.
              </h2>
              <p style={{ margin: 0, fontSize: 16, color: "var(--ink-2)", lineHeight: 1.8, maxWidth: 640 }}>
                {about.teamBody}
              </p>
            </div>
            <div style={{ border: "1px solid var(--rule)", padding: 30, background: "var(--paper-2)" }}>
              <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 14 }}>Team</div>
              <div style={{ display: "grid", gap: 12 }}>
                {teamMembers.map((member) => (
                  <div key={member} style={{ borderTop: "1px solid var(--rule)", paddingTop: 12 }}>
                    <div className="serif" style={{ fontSize: 24, letterSpacing: "-0.01em" }}>{member}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContA>
      </SectionA>

      <SectionA style={{ padding: "0 0 120px" }}>
        <ContA>
          <div style={{ border: "1px solid var(--rule)", background: "var(--paper-2)", padding: "38px 42px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 720 }}>
              <div className="serif" style={{ fontSize: 42, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                {about.ctaTitle || "Plan your visit."}
              </div>
              <p style={{ margin: "14px 0 0", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.7 }}>
                {about.ctaBody || "Get in touch to shape your stay."}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <BtnA onClick={() => setPage("plan")} variant="ghost">Plan your visit</BtnA>
              <BtnA onClick={onBook} variant="accent">Request to book</BtnA>
            </div>
          </div>
        </ContA>
      </SectionA>
    </div>
  );
}

window.Pages = window.Pages || {};
window.Pages.AboutPage = AboutPage;

}

{
// Stay page — 4 bungalows + B&B + Stay+Food + Whole Property

const { Img: ImgS, Section: SectionS, Container: ContS, Eyebrow: EyebrowS, Btn: BtnS, Price: PriceS } = window.UI;
const { ROOMS: R, STAY_MODES, IMG: IMGS } = window.DATA;

function StayPage({ onBook, setPage, currency }) {
  const [tab, setTab] = React.useState("bungalows");
  return (
    <div>
      <SectionS style={{ padding: "60px 0 40px" }}>
        <ContS>
          <EyebrowS>Stay</EyebrowS>
          <h1 className="serif" style={{ fontSize: "clamp(64px, 9vw, 140px)", lineHeight: 0.92, margin: "20px 0 26px", letterSpacing: "-0.03em" }}>
            Four bungalows.<br />
            <span className="italic-serif">One</span> long table.
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: 660 }}>
            Each bungalow is private, set in the spice gardens, with twin beds, an en-suite shower, solar hot water,
            air conditioning, and a veranda. There are also a few main-house rooms on the first floor for budget
            travellers and long stays.
          </p>

          <div style={{ display: "flex", gap: 6, borderBottom: "1px solid var(--rule)", marginTop: 40, flexWrap: "wrap" }}>
            {[
              ["bungalows", "Bungalows"],
              ["bnb",       "Bed & Breakfast"],
              ["fullboard", "Stay + All Meals"],
              ["whole",     "Whole Property"],
            ].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} style={{
                background: "transparent",
                border: "none",
                padding: "14px 20px",
                fontSize: 14,
                color: tab === k ? "var(--ink)" : "var(--muted)",
                borderBottom: tab === k ? "2px solid var(--accent)" : "2px solid transparent",
                cursor: "pointer",
                marginBottom: -1,
                fontFamily: "inherit",
              }}>{l}</button>
            ))}
          </div>
        </ContS>
      </SectionS>

      <SectionS style={{ padding: "40px 0 120px" }}>
        <ContS>
          {tab === "bungalows" && (
            <div style={{ display: "grid", gap: 80 }}>
              {R.slice(0, 4).map((room, i) => (
                <div key={room.id} style={{ display: "grid", gridTemplateColumns: i % 2 ? "1fr 1.2fr" : "1.2fr 1fr", gap: 60, alignItems: "center" }}>
                  <div style={{ order: i % 2 ? 2 : 1 }}>
                    <ImgS src={room.img} alt={room.name} ratio="4/3" />
                  </div>
                  <div style={{ order: i % 2 ? 1 : 2 }}>
                    <div className="mono tracked" style={{ color: "var(--accent)" }}>0{i + 1} of 04 · private bungalow</div>
                    <h2 className="serif" style={{ fontSize: 52, letterSpacing: "-0.02em", margin: "14px 0 16px", lineHeight: 1 }}>{room.name}</h2>
                    <p style={{ fontSize: 18, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 22 }}>{room.blurb}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {room.features.map(f => (
                        <li key={f} style={{ fontSize: 12, padding: "5px 12px", border: "1px solid var(--rule)", borderRadius: 999, color: "var(--ink-2)" }}>{f}</li>
                      ))}
                    </ul>
                    <BtnS onClick={onBook} variant="accent">Request this bungalow</BtnS>
                  </div>
                </div>
              ))}

              <div style={{ background: "var(--paper-2)", padding: 40, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, alignItems: "center" }}>
                <ImgS src={R[4].img} alt="main house" ratio="4/3" />
                <div>
                  <div className="mono tracked" style={{ color: "var(--accent)" }}>Plus · in the main house</div>
                  <h3 className="serif" style={{ fontSize: 36, letterSpacing: "-0.02em", margin: "12px 0 12px" }}>{R[4].name}</h3>
                  <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 16 }}>{R[4].blurb}</p>
                  <BtnS onClick={onBook} variant="ghost">Ask about main-house rooms</BtnS>
                </div>
              </div>
            </div>
          )}

          {tab === "bnb" && (
            <StayMode mode={STAY_MODES[0]} onBook={onBook} currency={currency} />
          )}
          {tab === "fullboard" && (
            <StayMode mode={STAY_MODES[1]} onBook={onBook} currency={currency} />
          )}
          {tab === "whole" && (
            <div>
              <ImgS src={IMGS.hero} alt="whole property" ratio="21/9" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 60 }}>
                <div>
                  <h2 className="serif" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em", margin: 0 }}>The whole farm, just for you.</h2>
                  <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.7, marginTop: 22 }}>
                    All four bungalows, the long kitchen, our family&rsquo;s full attention, and the 6.5 acres. Popular with families,
                    writing retreats, and small celebrations. Three-night minimum.
                  </p>
                  <ul style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 2, paddingLeft: 18, marginTop: 12 }}>
                    <li>Up to 8 guests</li>
                    <li>All meals included, vegetarian</li>
                    <li>Daily housekeeping</li>
                    <li>Programs (cooking / cultural) can be added on top</li>
                  </ul>
                </div>
                <div style={{ background: "var(--paper-2)", padding: 30 }}>
                  <div className="mono tracked" style={{ color: "var(--accent)" }}>Whole property</div>
                  <div className="serif" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em", margin: "8px 0" }}>On request</div>
                  <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>Up to 8 guests · 3-night minimum · all meals included</div>
                  <BtnS onClick={onBook} variant="accent" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>Request whole property</BtnS>
                </div>
              </div>
            </div>
          )}
        </ContS>
      </SectionS>
    </div>
  );
}

function StayMode({ mode, onBook, currency }) {
  const singleFrom = typeof mode.pricing?.single === "object" ? mode.pricing.single.from : mode.pricing?.single;
  const singleTo   = typeof mode.pricing?.single === "object" ? mode.pricing.single.to : null;
  const doubleFrom = typeof mode.pricing?.double === "object" ? mode.pricing.double.from : mode.pricing?.double;
  const doubleTo   = typeof mode.pricing?.double === "object" ? mode.pricing.double.to : null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
      <ImgS src={mode.img} alt={mode.title} ratio="4/3" />
      <div>
        <h2 className="serif" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em" }}>{mode.title}</h2>
        <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.7, marginTop: 20 }}>{mode.blurb}</p>
        {mode.inclusions && (
          <ul style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 2, paddingLeft: 18, marginTop: 16 }}>
            {mode.inclusions.map(f => <li key={f}>{f}</li>)}
          </ul>
        )}
        <div style={{ background: "var(--paper-2)", padding: "24px 28px", marginTop: 26, display: "grid", gap: 14 }}>
          {singleFrom && (
            <PriceRow
              label="Single occupancy (double room)"
              from={singleFrom} to={singleTo} per="/ night" currency={currency}
            />
          )}
          {doubleFrom && (
            <PriceRow
              label="Double occupancy (twin/double)"
              from={doubleFrom} to={doubleTo} per="/ night" currency={currency}
            />
          )}
          {mode.notes && (
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 6, lineHeight: 1.55, letterSpacing: "0.06em" }}>
              {mode.notes}
            </div>
          )}
        </div>
        <BtnS onClick={onBook} variant="accent" style={{ marginTop: 22 }}>
          Request {mode.title}
        </BtnS>
      </div>
    </div>
  );
}

function PriceRow({ label, from, to, per, currency }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, borderTop: "1px dashed var(--rule)", paddingTop: 14 }}>
      <div style={{ fontSize: 14, color: "var(--ink-2)", maxWidth: 240 }}>{label}</div>
      <div className="serif" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
        <PriceS inr={from} currency={currency} />
        {to && <> – <PriceS inr={to} currency={currency} /></>}
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)", marginLeft: 6, fontFamily: "'IBM Plex Mono', monospace" }}>{per}</span>
      </div>
    </div>
  );
}

window.Pages = window.Pages || {};
window.Pages.StayPage = StayPage;

}

{
// Experiences hub — filterable, real packages, links to deep pages

const { Img: ImgE, Section: SectionE, Container: ContE, Eyebrow: EyebrowE, Btn: BtnE, Price: PriceE } = window.UI;
const { PACKAGES: PK } = window.DATA;

function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 16px",
      borderRadius: 999,
      border: "1px solid " + (active ? "var(--ink)" : "var(--rule)"),
      background: active ? "var(--ink)" : "transparent",
      color: active ? "var(--paper)" : "var(--ink-2)",
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>{children}</button>
  );
}

function ExperiencesPage({ onBook, currency, setCurrency, openPackage }) {
  const [category, setCategory] = React.useState("all");
  const [duration, setDuration] = React.useState("all");
  const [party, setParty] = React.useState("solo"); // "solo" | "couple"

  // Compute display price + sublabel based on party type.
  const priceFor = (p) => {
    const pr = p.pricing || {};
    if (party === "couple") {
      // For couples, prefer the "two cooks sharing" rate, then twin, then twin-with-guest,
      // then per-person × 2 for day workshops, then onRequest.
      if (pr.twinBothCook   != null) return { inr: pr.twinBothCook,   label: "/ couple (both cook)" };
      if (pr.twin           != null) return { inr: pr.twin,           label: "/ couple" };
      if (pr.twinBothTravel != null) return { inr: pr.twinBothTravel, label: "/ couple" };
      if (pr.twinWithGuest  != null) return { inr: pr.twinWithGuest,  label: "/ couple (1 cooks)" };
      if (pr.perPerson      != null) return { inr: pr.perPerson * 2,  label: "/ couple" };
      return { inr: null, label: "On request" };
    }
    // Solo
    if (pr.solo      != null) return { inr: pr.solo,      label: "/ solo" };
    if (pr.perPerson != null) return { inr: pr.perPerson, label: "/ guest" };
    return { inr: null, label: "On request" };
  };

  const filtered = PK.filter(p => {
    if (category !== "all" && p.category !== category) return false;
    if (duration === "day"    && p.nights !== 0)    return false;
    if (duration === "short"  && (p.nights === null || p.nights < 1 || p.nights > 3)) return false;
    if (duration === "mid"    && (p.nights === null || p.nights < 4 || p.nights > 6)) return false;
    if (duration === "long"   && (p.nights === null || p.nights < 7)) return false;
    if (duration === "custom" && p.nights !== null) return false;
    return true;
  });

  return (
    <div>
      <SectionE style={{ padding: "60px 0 30px" }}>
        <ContE>
          <EyebrowE>Experiences · vegetarian, capped at eight</EyebrowE>
          <h1 className="serif" style={{ fontSize: "clamp(64px, 9vw, 140px)", lineHeight: 0.92, margin: "20px 0 30px", letterSpacing: "-0.03em" }}>
            Eleven programs.<br />
            <span className="italic-serif">One</span> filter away.
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: 680 }}>
            From a four-hour cooking demonstration to an eleven-day vegetarian residency, plus a tailor-made Ayurvedic
            program for the monsoon months. Every program is hands-on, capped at eight guests, and tailored on arrival.
          </p>
        </ContE>
      </SectionE>

      <SectionE style={{ padding: "30px 0 40px", position: "sticky", top: 72, zIndex: 20, background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}>
        <ContE>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 10 }}>Category</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  ["all",      "All"],
                  ["day",      "Day workshop"],
                  ["culinary", "Culinary"],
                  ["cultural", "Cultural"],
                  ["wellness", "Monsoon wellness"],
                  ["tailor",   "Tailor-made"],
                ].map(([k, l]) => (
                  <Chip key={k} active={category === k} onClick={() => setCategory(k)}>{l}</Chip>
                ))}
              </div>
            </div>
            <div>
              <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 10 }}>Duration</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  ["all",    "Any"],
                  ["day",    "A day"],
                  ["short",  "1–3 nights"],
                  ["mid",    "4–6 nights"],
                  ["long",   "7+ nights"],
                  ["custom", "Custom"],
                ].map(([k, l]) => (
                  <Chip key={k} active={duration === k} onClick={() => setDuration(k)}>{l}</Chip>
                ))}
              </div>
            </div>
            <div>
              <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 10 }}>Currency</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {Object.values(window.DATA.CURRENCY).map((c) => (
                  <Chip key={c.code} active={currency === c.code} onClick={() => setCurrency(c.code)}>
                    <span style={{ color: currency === c.code ? "var(--paper)" : "var(--accent)", marginRight: 4 }}>{c.symbol}</span>
                    {c.code}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 10 }}>Show prices for</div>
              <div style={{ display: "inline-flex", border: "1px solid var(--rule)", borderRadius: 999, padding: 3, background: "var(--paper-2)" }}>
                {[
                  ["solo",   "Solo traveller"],
                  ["couple", "Couple / two guests"],
                ].map(([k, l]) => (
                  <button key={k} onClick={() => setParty(k)} style={{
                    padding: "7px 16px",
                    borderRadius: 999,
                    border: "none",
                    background: party === k ? "var(--ink)" : "transparent",
                    color: party === k ? "var(--paper)" : "var(--ink-2)",
                    fontSize: 13,
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}>{l}</button>
                ))}
              </div>
            </div>
            <div style={{ marginLeft: "auto", fontSize: 13, color: "var(--muted)" }} className="mono">
              Showing {filtered.length} of {PK.length}
            </div>
          </div>
        </ContE>
      </SectionE>

      <SectionE style={{ padding: "60px 0 120px" }}>
        <ContE>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 80 }}>
              <div className="serif" style={{ fontSize: 40, marginBottom: 20 }}>Nothing fits — but we can build it.</div>
              <BtnE onClick={onBook} variant="accent">Enquire for tailor-made</BtnE>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
              {filtered.map(p => {
                const pr = priceFor(p);
                return (
                  <div key={p.id} style={{ background: "var(--paper-2)", padding: 20, borderRadius: 4, cursor: "pointer", transition: "transform .2s ease", display: "flex", flexDirection: "column" }}
                       onClick={() => openPackage(p.slug)}
                       onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                       onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                    <ImgE src={p.img} alt={p.title} ratio="4/5" />
                    <div style={{ padding: "22px 4px 4px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", textTransform: "uppercase" }}>
                          {p.nights === 0 ? "Day" : p.nights === null ? "Custom" : p.nights + "N / " + p.days + "D"}
                        </span>
                        <span className="mono" style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                          {p.category === "wellness" ? "Monsoon" : p.category === "tailor" ? "Bespoke" : p.focus}
                        </span>
                      </div>
                      <div className="serif" style={{ fontSize: 26, letterSpacing: "-0.01em", lineHeight: 1.15, marginBottom: 12, minHeight: 60 }}>
                        {p.title}
                      </div>
                      <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: 0, flex: 1 }}>{p.blurb}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, borderTop: "1px solid var(--rule)", paddingTop: 16 }}>
                        <div>
                          <div className="serif" style={{ fontSize: 22, lineHeight: 1 }}>
                            {pr.inr ? <PriceE inr={pr.inr} currency={currency} /> : "On request"}
                          </div>
                          {pr.inr && (
                            <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 4, letterSpacing: "0.08em" }}>
                              {pr.label}
                            </div>
                          )}
                        </div>
                        <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.1em" }}>VIEW →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ContE>
      </SectionE>
    </div>
  );
}

window.Pages = window.Pages || {};
window.Pages.ExperiencesPage = ExperiencesPage;

}

{
// The Farm — merged About + Food + Activities + Local Landmarks (real history)

const { Img: ImgF, Section: SectionF, Container: ContF, Eyebrow: EyebrowF, Btn: BtnF } = window.UI;
const { IMG: IMGF, ACTIVITIES, BRAND } = window.DATA;

function FarmPage({ onBook }) {
  return (
    <div>
      <SectionF style={{ padding: "60px 0 40px" }}>
        <ContF>
          <EyebrowF>The Farm · Haritha Farms est. 1962 · The Pimenta since 1992</EyebrowF>
          <h1 className="serif" style={{ fontSize: "clamp(64px, 9vw, 140px)", lineHeight: 0.92, margin: "20px 0 30px", letterSpacing: "-0.03em" }}>
            Six and a half<br />
            acres, three<br />
            generations <span className="italic-serif">deep</span>.
          </h1>
        </ContF>
      </SectionF>

      <SectionF style={{ padding: "20px 0 100px" }}>
        <ContF>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 0.8fr", gap: 28, alignItems: "start" }}>
            <div style={{ paddingTop: 30 }}>
              <ImgF src={IMGF.cooking4} alt="the kitchen" ratio="3/4" />
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 10 }}>01 — the kitchen</div>
            </div>
            <ImgF src={IMGF.hero} alt="the farm" ratio="4/5" />
            <div style={{ paddingTop: 90 }}>
              <ImgF src={IMGF.tour2} alt="tea country" ratio="3/4" />
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 10 }}>02 — tea country, 90 min away</div>
            </div>
          </div>
        </ContF>
      </SectionF>

      <SectionF style={{ padding: "40px 0 120px" }}>
        <ContF width={900}>
          <EyebrowF>Our story</EyebrowF>
          <div className="serif" style={{ fontSize: 24, lineHeight: 1.55, color: "var(--ink-2)", marginTop: 30, fontWeight: 300 }}>
            <p>
              Our family planted the first trees on Haritha Farms in 1962. For thirty years it was a rubber plantation, like
              most of the midlands. In the early 1990s we tore up the monoculture, sworn off chemicals, and replanted
              with pepper, coconut, cocoa, vanilla, turmeric and the medicinal plants that grow well here.
            </p>
            <p>
              We opened the kitchen to travellers in 1992. Since then we&rsquo;ve hosted day visitors, residencies, NRI
              families coming home, and a long quiet line of solo guests writing books on the veranda. We are still
              one small family, one long table, and four bungalows. We&rsquo;ve been intentional about not growing.
            </p>
            <p>
              The food has always been vegetarian — it&rsquo;s how Kerala has cooked for centuries, and it&rsquo;s what we know
              how to teach properly. Madhu has run the kitchen for twenty-one years. Jacob runs the rest. Our family
              still does the gardening.
            </p>
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 14 }}>
            <BtnF onClick={onBook} variant="accent">Come see for yourself</BtnF>
          </div>
        </ContF>
      </SectionF>

      <SectionF style={{ background: "var(--paper-2)", padding: "120px 0" }}>
        <ContF>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }}>
            {[
              ["1962", "Family plants Haritha Farms"],
              ["1992", "Kitchen opens to travellers"],
              ["Early 1990s", "Chemical-free, replanted forest garden"],
              ["2026", "You arrive"],
            ].map(([y, t]) => (
              <div key={y} style={{ background: "var(--paper-2)", padding: "50px 30px" }}>
                <div className="serif" style={{ fontSize: 44, letterSpacing: "-0.02em", lineHeight: 1.05 }}>{y}</div>
                <div style={{ color: "var(--ink-2)", fontSize: 15, marginTop: 12, lineHeight: 1.55 }}>{t}</div>
              </div>
            ))}
          </div>
        </ContF>
      </SectionF>

      <SectionF>
        <ContF>
          <EyebrowF>What grows here</EyebrowF>
          <h2 className="serif" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.025em", margin: "18px 0 30px" }}>
            Pepper. <span className="italic-serif">Cocoa</span>. Cardamom. <span className="italic-serif">Vanilla</span>. Turmeric.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 30 }}>
            {[
              ["Pepper", "Tellicherry, climbing borrowed trees."],
              ["Coconut", "More than 50 trees, three varieties."],
              ["Cocoa", "Beans for our bean-to-bar program."],
              ["Bananas", "Twelve varieties; not all sweet."],
              ["Cardamom", "Small green pods, perfumed."],
              ["Nutmeg & mace", "Same fruit, two spices."],
              ["Cinnamon", "Bark, the real one."],
              ["Vanilla", "Hand-pollinated, slow-cured."],
              ["Turmeric", "Bright orange, freshly dug."],
              ["Pineapple", "From neighbours, mostly."],
              ["Ginger", "Right behind the kitchen."],
              ["Medicinal herbs", "More than 40, for Ayurvedic cooking."],
            ].map(([name, note]) => (
              <div key={name} style={{ borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
                <div className="serif" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>{name}</div>
                <p style={{ fontSize: 12, color: "var(--muted)", margin: "6px 0 0", lineHeight: 1.55 }}>{note}</p>
              </div>
            ))}
          </div>
        </ContF>
      </SectionF>

      <SectionF style={{ padding: "100px 0" }}>
        <ContF>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 50, flexWrap: "wrap", gap: 30 }}>
            <div>
              <EyebrowF>Activities & day-trips</EyebrowF>
              <h2 className="serif" style={{ fontSize: 64, lineHeight: 1, letterSpacing: "-0.025em", margin: "18px 0 0" }}>
                What you can do<br /> <span className="italic-serif">between</span> meals.
              </h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: 380 }}>
              Many of these are included in our packages. Mix and match for a tailor-made stay, or just pick a couple
              and spend the rest on the veranda.
            </p>
          </div>

          <div style={{ display: "grid", gap: 50 }}>
            {ACTIVITIES.map(group => (
              <div key={group.group}>
                <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 18 }}>— {group.group}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
                  {group.items.map(a => (
                    <div key={a.title} style={{ borderTop: "1px solid var(--rule)", paddingTop: 16 }}>
                      <div className="serif" style={{ fontSize: 24, letterSpacing: "-0.01em" }}>{a.title}</div>
                      <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, margin: "8px 0 0" }}>{a.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ContF>
      </SectionF>
    </div>
  );
}

window.Pages = window.Pages || {};
window.Pages.FarmPage = FarmPage;

}

{
// Journal — merged Blog + Media + Gallery

const { Img: ImgJ, Section: SectionJ, Container: ContJ, Eyebrow: EyebrowJ } = window.UI;
const { JOURNAL_POSTS: JP, IMG: IMGJ } = window.DATA;

function JournalPage() {
  const [filter, setFilter] = React.useState("all");
  const filtered = filter === "all" ? JP : JP.filter(p => p.kind === filter);

  return (
    <div>
      <SectionJ style={{ padding: "60px 0 30px" }}>
        <ContJ>
          <EyebrowJ>Journal · stories · press · photos</EyebrowJ>
          <h1 className="serif" style={{ fontSize: "clamp(64px, 9vw, 140px)", lineHeight: 0.92, margin: "20px 0 30px", letterSpacing: "-0.03em" }}>
            What we've been<br />
            <span className="italic-serif">writing</span> down.
          </h1>
          <div style={{ display: "flex", gap: 6, marginTop: 30 }}>
            {[["all", "All"], ["story", "Stories"], ["press", "Press"], ["photos", "Photos"]].map(([k, l]) => (
              <button key={k} onClick={() => setFilter(k)} style={{
                background: filter === k ? "var(--ink)" : "transparent",
                color: filter === k ? "var(--paper)" : "var(--ink-2)",
                border: "1px solid " + (filter === k ? "var(--ink)" : "var(--rule)"),
                padding: "8px 16px", borderRadius: 999, fontSize: 13, cursor: "pointer",
              }}>{l}</button>
            ))}
          </div>
        </ContJ>
      </SectionJ>

      <SectionJ style={{ padding: "40px 0 80px" }}>
        <ContJ>
          {filtered[0] && (
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, marginBottom: 80, alignItems: "center" }}>
              <ImgJ src={filtered[0].img} alt={filtered[0].title} ratio="4/3" />
              <div>
                <div className="mono tracked" style={{ color: "var(--accent)" }}>Featured · {filtered[0].kind}</div>
                <h2 className="serif" style={{ fontSize: 54, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "18px 0 18px" }}>{filtered[0].title}</h2>
                <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6 }}>{filtered[0].excerpt}</p>
                <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 20 }}>{filtered[0].date} · 4 min read</div>
              </div>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {filtered.slice(1).map(p => (
              <div key={p.id}>
                <ImgJ src={p.img} alt={p.title} ratio="4/3" />
                <div className="mono tracked" style={{ color: "var(--muted)", marginTop: 14 }}>{p.kind} · {p.date}</div>
                <div className="serif" style={{ fontSize: 24, lineHeight: 1.2, margin: "8px 0 10px" }}>{p.title}</div>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: 0 }}>{p.excerpt}</p>
              </div>
            ))}
          </div>
        </ContJ>
      </SectionJ>

      <SectionJ style={{ padding: "40px 0 120px" }}>
        <ContJ>
          <EyebrowJ>Gallery</EyebrowJ>
          <h2 className="serif" style={{ fontSize: 56, letterSpacing: "-0.02em", margin: "18px 0 40px" }}>Photographs from the farm.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[IMGJ.cooking1, IMGJ.hero, IMGJ.temple, IMGJ.tour2, IMGJ.truck, IMGJ.church, IMGJ.cooking3, IMGJ.tour4, IMGJ.cooking5, IMGJ.tour1, IMGJ.temple2, IMGJ.church2].map((src, i) => (
              <ImgJ key={i} src={src} alt={"photo " + (i + 1)} ratio={i % 3 === 0 ? "3/4" : "1/1"} />
            ))}
          </div>
        </ContJ>
      </SectionJ>
    </div>
  );
}

window.Pages = window.Pages || {};
window.Pages.JournalPage = JournalPage;

}

{
// Plan Your Visit — merged FAQ + Getting There + NRI + Terms (real content)

const { Img: ImgP, Section: SectionP, Container: ContP, Eyebrow: EyebrowP, Btn: BtnP } = window.UI;
const { FAQS, IMG: IMGP, BRAND } = window.DATA;

function PlanPage({ onBook }) {
  const [openFaq, setOpenFaq] = React.useState(0);
  return (
    <div>
      <SectionP style={{ padding: "60px 0 40px" }}>
        <ContP>
          <EyebrowP>Plan your visit</EyebrowP>
          <h1 className="serif" style={{ fontSize: "clamp(64px, 9vw, 140px)", lineHeight: 0.92, margin: "20px 0 30px", letterSpacing: "-0.03em" }}>
            Everything you<br />
            might <span className="italic-serif">want</span> to ask.
          </h1>
        </ContP>
      </SectionP>

      <SectionP style={{ padding: "20px 0 80px" }}>
        <ContP>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { t: "Getting here", b: "About 90 min from Kochi International Airport. We'll arrange a driver (≈Rs 3,500). Trains to Aluva, Ernakulam, or Kottayam also work — we pick you up.", img: IMGP.tour3 },
              { t: "What to bring", b: "Light cotton, modest temple-friendly options for visits, a hat, insect repellent, sun protection, a camera. Leave the dressy shoes; you'll live in sandals.", img: IMGP.tour2 },
              { t: "When to come", b: "Oct–Mar for dry and pleasant. Jun–Oct for the monsoon — green, dramatic, and the right time for our Ayurvedic Wellness program.", img: IMGP.hero },
            ].map((c, i) => (
              <div key={i} style={{ border: "1px solid var(--rule)", padding: 24 }}>
                <ImgP src={c.img} alt={c.t} ratio="4/3" />
                <div className="serif" style={{ fontSize: 28, marginTop: 20, letterSpacing: "-0.01em" }}>{c.t}</div>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, marginTop: 10 }}>{c.b}</p>
              </div>
            ))}
          </div>
        </ContP>
      </SectionP>

      <SectionP style={{ background: "var(--paper-2)", padding: "100px 0" }}>
        <ContP>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <EyebrowP>Frequently asked</EyebrowP>
              <div className="serif" style={{ fontSize: 54, lineHeight: 1.05, letterSpacing: "-0.025em", marginTop: 20 }}>
                The questions<br /><span className="italic-serif">everyone</span> asks.
              </div>
              <p style={{ color: "var(--ink-2)", marginTop: 24, lineHeight: 1.6, fontSize: 15 }}>
                Can&rsquo;t find your answer? We reply to every enquiry personally, usually within a day.
              </p>
              <BtnP onClick={onBook} variant="accent" style={{ marginTop: 20 }}>Ask us directly</BtnP>
            </div>
            <div>
              {FAQS.map((f, i) => (
                <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "22px 0", cursor: "pointer" }} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="serif" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>{f.q}</div>
                    <div style={{ color: "var(--accent)", fontSize: 20 }}>{openFaq === i ? "−" : "+"}</div>
                  </div>
                  {openFaq === i && (
                    <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.7, marginTop: 14, maxWidth: 640 }}>{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ContP>
      </SectionP>

      <SectionP>
        <ContP>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <EyebrowP>For Non-Resident Indians</EyebrowP>
              <h2 className="serif" style={{ fontSize: 54, letterSpacing: "-0.025em", lineHeight: 1.05, margin: "18px 0 20px" }}>Coming home, briefly.</h2>
              <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.65 }}>
                Many of our guests are NRIs bringing children or grandchildren to Kerala for the first time. We keep one
                bungalow aside for multi-generational stays, cook amma&rsquo;s dishes (or thatha&rsquo;s — tell us which), and
                arrange family-friendly day trips. Ask for our NRI program when you enquire.
              </p>
              <BtnP onClick={onBook} variant="ghost" style={{ marginTop: 26 }}>Ask about NRI stays</BtnP>
            </div>
            <ImgP src={IMGP.temple} alt="temple" ratio="1/1" />
          </div>
        </ContP>
      </SectionP>

      <SectionP style={{ padding: "80px 0 60px" }}>
        <ContP>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              <EyebrowP>Direct contact</EyebrowP>
              <h2 className="serif" style={{ fontSize: 44, letterSpacing: "-0.025em", margin: "18px 0 24px", lineHeight: 1.05 }}>
                We answer<br />every enquiry <span className="italic-serif">ourselves</span>.
              </h2>
              <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
                <ContactRow label="Email" value="thepimenta@gmail.com" />
                <ContactRow label="Phone / WhatsApp" value="+91 94473 02347" />
                <ContactRow label="Booking hours" value="Mon–Sat 9am–6pm IST · Sun 10am–4pm IST" />
                <ContactRow label="Response time" value="Usually within 24 hours" />
                <ContactRow label="Address" value="Kadalikad, Kerala (full address on confirmation)" />
              </div>
            </div>
            <div style={{ background: "var(--paper-2)", padding: 40 }}>
              <EyebrowP>Booking process</EyebrowP>
              <ol style={{ paddingLeft: 0, listStyle: "none", margin: "20px 0 0", display: "grid", gap: 18 }}>
                {[
                  ["Enquiry", "Write with dates, group, dietary needs, and what you&rsquo;d like the trip to feel like."],
                  ["Reply", "Within a day, a proposed program and a price (or availability for a fixed one)."],
                  ["Deposit", "25–30% non-refundable to confirm. Bank transfer in INR, international wire, or card."],
                  ["Confirmation", "An info pack — directions, what to expect, what to pack."],
                  ["Balance on arrival", "By transfer or card. We&rsquo;ll have the kettle on."],
                ].map(([t, b], i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "30px 1fr", gap: 16 }}>
                    <div className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="serif" style={{ fontSize: 18, letterSpacing: "-0.005em" }}>{t}</div>
                      <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: "4px 0 0" }} dangerouslySetInnerHTML={{ __html: b }} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ContP>
      </SectionP>

      <SectionP style={{ padding: "60px 0 120px" }}>
        <ContP width={900}>
          <EyebrowP>Terms & Conditions</EyebrowP>
          <h3 className="serif" style={{ fontSize: 32, margin: "16px 0 24px", letterSpacing: "-0.02em" }}>The short version.</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7 }}>
            <div>
              <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>Cancellation</div>
              Free cancellation up to 14 days before arrival. After that, 50% refund up to 7 days; no refund within 7 days.
              We know travel plans change — we&rsquo;ll always try to rebook you.
            </div>
            <div>
              <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>Payment</div>
              25–30% deposit on confirmation; balance on arrival. Bank transfer (INR or international), card on arrival,
              or UPI for Indian guests.
            </div>
            <div>
              <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>Children</div>
              All ages welcome on Tailor-Made and Whole Property programs. Cooking residencies are best for ages 14+.
            </div>
            <div>
              <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>Dietary</div>
              Our entire kitchen is already vegetarian. Vegan, gluten-free, no-nut, Jain — all fine. Just tell us when
              you enquire.
            </div>
          </div>
        </ContP>
      </SectionP>
    </div>
  );
}

function ContactRow({ label, value }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 16, alignItems: "baseline", borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
      <div className="mono tracked" style={{ color: "var(--muted)" }}>{label}</div>
      <div style={{ fontSize: 16, color: "var(--ink)" }}>{value}</div>
    </div>
  );
}

window.Pages = window.Pages || {};
window.Pages.PlanPage = PlanPage;

}

{
// Dedicated terms page sourced from editable site content

const { Section: SectionT, Container: ContT, Eyebrow: EyebrowT, Btn: BtnT } = window.UI;
const { TERMS: TERMST, BRAND: BRANDT } = window.DATA;

function TermsPage({ setPage, onBook }) {
  const terms = TERMST || {};
  const sections = terms.sections || [];

  return (
    <div>
      <SectionT style={{ padding: "60px 0 36px" }}>
        <ContT width={980}>
          <button
            onClick={() => setPage("home")}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--muted)",
              fontSize: 13,
              cursor: "pointer",
              padding: 0,
              marginBottom: 24,
            }}
          >
            ← Back to home
          </button>
          <EyebrowT>Legal</EyebrowT>
          <h1 className="serif" style={{ fontSize: "clamp(52px, 8vw, 110px)", lineHeight: 0.94, margin: "18px 0 18px", letterSpacing: "-0.03em" }}>
            {terms.title || "Terms and Conditions"}
          </h1>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div className="mono tracked" style={{ color: "var(--accent)" }}>
              {terms.lastUpdated ? `Last updated · ${terms.lastUpdated}` : "Booking conditions"}
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>
              {BRANDT?.contact?.email || "thepimenta@gmail.com"}
            </div>
          </div>
          <p style={{ maxWidth: 860, margin: "26px 0 0", fontSize: 17, color: "var(--ink-2)", lineHeight: 1.75 }}>
            {terms.intro}
          </p>
        </ContT>
      </SectionT>

      <SectionT style={{ padding: "12px 0 72px" }}>
        <ContT width={980}>
          <div style={{ display: "grid", gap: 18 }}>
            {sections.map((section, index) => (
              <div
                key={`${section.title}-${index}`}
                style={{
                  border: "1px solid var(--rule)",
                  background: index % 2 === 0 ? "var(--paper)" : "var(--paper-2)",
                  padding: "28px 30px",
                  borderRadius: 4,
                }}
              >
                <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 12 }}>
                  Clause {String(index + 1).padStart(2, "0")}
                </div>
                <div className="serif" style={{ fontSize: 30, letterSpacing: "-0.02em", lineHeight: 1.08 }}>
                  {section.title}
                </div>
                <p style={{ margin: "14px 0 0", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.8 }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {terms.acknowledgement ? (
            <div
              style={{
                marginTop: 24,
                border: "1px solid var(--rule)",
                background: "var(--paper-2)",
                padding: "24px 28px",
                borderRadius: 4,
              }}
            >
              <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>
                Acknowledgement
              </div>
              <p style={{ margin: 0, fontSize: 15, color: "var(--ink-2)", lineHeight: 1.8 }}>
                {terms.acknowledgement}
              </p>
            </div>
          ) : null}

          <div
            style={{
              marginTop: 32,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              borderTop: "1px solid var(--rule)",
              paddingTop: 28,
            }}
          >
            <p style={{ margin: 0, maxWidth: 540, fontSize: 15, color: "var(--ink-2)", lineHeight: 1.7 }}>
              Questions about a clause or booking condition? We are happy to clarify the terms before you confirm your stay.
            </p>
            <BtnT onClick={onBook} variant="accent">
              Request to book
            </BtnT>
          </div>
        </ContT>
      </SectionT>
    </div>
  );
}

window.Pages = window.Pages || {};
window.Pages.TermsPage = TermsPage;

}

{
// Request-to-Book flow — replaces the enquiry-only model

const { Section: SectionB, Container: ContB, Eyebrow: EyebrowB, Price: PriceB } = window.UI;
const { PACKAGES: PKB } = window.DATA;

function BookPage({ initialPkg, setPage, currency }) {
  // initialPkg can be a slug or id
  const findPkg = (key) => PKB.find(p => p.slug === key || p.id === key) || PKB.find(p => p.id === "residency");
  const initial = findPkg(initialPkg);

  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    pkg: initial.id,
    checkin: "",
    checkout: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    notes: "",
    diet: [],
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitState, setSubmitState] = React.useState({ type: "", message: "" });
  const [todayIso] = React.useState(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().slice(0, 10);
  });

  const pkg = PKB.find(p => p.id === form.pkg) || initial;
  const nights = pkg ? (pkg.nights || 0) : 0;
  const perPerson = pkg.pricing?.perPerson;
  const soloPrice = pkg.pricing?.solo;
  const indicativeInr = perPerson ? perPerson * form.guests : (soloPrice && form.guests === 1 ? soloPrice : (pkg.pricing?.twinBothCook ?? pkg.pricing?.twin ?? null));

  const update = (k, v) => setForm(f => {
    if (k === "checkin") {
      return {
        ...f,
        checkin: v,
        checkout: f.checkout && v && f.checkout < v ? v : f.checkout,
      };
    }

    if (k === "checkout") {
      const minimumCheckout = f.checkin || todayIso;
      return {
        ...f,
        checkout: v && v < minimumCheckout ? minimumCheckout : v,
      };
    }

    return { ...f, [k]: v };
  });

  const Label = ({ children }) => <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 8 }}>{children}</div>;
  const inputStyle = { width: "100%", border: "none", borderBottom: "1px solid var(--rule)", padding: "10px 0", fontSize: 16, background: "transparent", fontFamily: "inherit", color: "var(--ink)", outline: "none" };

  const submitEnquiry = async () => {
    if (!form.name.trim()) {
      setSubmitState({ type: "error", message: "Please add your name before sending." });
      return;
    }

    if (!form.email.trim()) {
      setSubmitState({ type: "error", message: "Please add your email before sending." });
      return;
    }

    setSubmitting(true);
    setSubmitState({ type: "", message: "" });

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: pkg.id,
          packageSlug: pkg.slug,
          packageTitle: pkg.title,
          checkin: form.checkin,
          checkout: form.checkout,
          guests: form.guests,
          name: form.name,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
          diet: form.diet,
          indicativeTotalInr: indicativeInr,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "We couldn't send your enquiry right now.");
      }

      setSubmitState({
        type: "success",
        message: "Enquiry sent. We'll reply personally within 24 hours.",
      });
      setPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitState({
        type: "error",
        message: error.message || "We couldn't send your enquiry right now.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SectionB style={{ padding: "60px 0 40px" }}>
        <ContB>
          <EyebrowB>Request to book</EyebrowB>
          <h1 className="serif" style={{ fontSize: "clamp(56px, 7vw, 96px)", lineHeight: 0.95, margin: "20px 0 20px", letterSpacing: "-0.03em" }}>
            Four steps.<br />We reply <span className="italic-serif">personally</span>.
          </h1>
          <div style={{ display: "flex", gap: 6, marginTop: 30 }}>
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{ flex: 1, height: 3, background: step >= n ? "var(--accent)" : "var(--rule)", borderRadius: 2 }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", marginTop: 12 }} className="mono tracked">
            <span>01 — Package</span>
            <span>02 — Dates & guests</span>
            <span>03 — You</span>
            <span>04 — Confirm</span>
          </div>
        </ContB>
      </SectionB>

      <SectionB style={{ padding: "30px 0 120px" }}>
        <ContB>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 60 }}>
            <div style={{ minHeight: 500 }}>
              {step === 1 && (
                <div>
                  <h2 className="serif" style={{ fontSize: 40, letterSpacing: "-0.02em", margin: "0 0 24px" }}>Pick a program.</h2>
                  <div style={{ display: "grid", gap: 12 }}>
                    {PKB.map(p => {
                      const showPrice = p.pricing?.solo ?? p.pricing?.perPerson;
                      return (
                      <label key={p.id} style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gap: 20,
                        alignItems: "center",
                        padding: "16px 20px",
                        border: "1px solid " + (form.pkg === p.id ? "var(--ink)" : "var(--rule)"),
                        background: form.pkg === p.id ? "var(--paper-2)" : "transparent",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}>
                        <input type="radio" name="pkg" checked={form.pkg === p.id} onChange={() => update("pkg", p.id)} />
                        <div>
                          <div className="serif" style={{ fontSize: 20, letterSpacing: "-0.01em" }}>{p.title}</div>
                          <div style={{ fontSize: 13, color: "var(--muted)" }}>{p.blurb}</div>
                        </div>
                        <div className="mono" style={{ fontSize: 13, color: "var(--accent)", textAlign: "right" }}>
                          {p.nights === 0 ? "Day" : p.nights === null ? "Custom" : p.nights + "N"}
                          <div style={{ color: "var(--ink)", marginTop: 2 }}>
                            {showPrice ? <PriceB inr={showPrice} currency={currency} /> : "On request"}
                          </div>
                        </div>
                      </label>
                      );
                    })}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2 className="serif" style={{ fontSize: 40, letterSpacing: "-0.02em", margin: "0 0 24px" }}>When and with whom?</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, marginBottom: 30 }}>
                    <div>
                      <Label>Check in</Label>
                      <input type="date" min={todayIso} value={form.checkin} onChange={e => update("checkin", e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <Label>Check out</Label>
                      <input type="date" min={form.checkin || todayIso} value={form.checkout} onChange={e => update("checkout", e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                  <Label>Number of guests</Label>
                  <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <button key={n} onClick={() => update("guests", n)} style={{
                        width: 48, height: 48, borderRadius: "50%",
                        border: "1px solid " + (form.guests === n ? "var(--ink)" : "var(--rule)"),
                        background: form.guests === n ? "var(--ink)" : "transparent",
                        color: form.guests === n ? "var(--paper)" : "var(--ink)",
                        cursor: "pointer", fontSize: 15, fontFamily: "inherit",
                      }}>{n}</button>
                    ))}
                  </div>
                  <div style={{ marginTop: 40 }}>
                    <Label>Any dietary needs?</Label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {["Vegan", "Gluten-free", "Nut-free", "Jain", "None"].map(d => {
                        const on = form.diet.includes(d);
                        return (
                          <button key={d} onClick={() => update("diet", on ? form.diet.filter(x => x !== d) : [...form.diet, d])} style={{
                            padding: "8px 14px", borderRadius: 999,
                            border: "1px solid " + (on ? "var(--accent)" : "var(--rule)"),
                            background: on ? "var(--accent)" : "transparent",
                            color: on ? "var(--paper)" : "var(--ink-2)",
                            fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                          }}>{d}</button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2 className="serif" style={{ fontSize: 40, letterSpacing: "-0.02em", margin: "0 0 24px" }}>Tell us about you.</h2>
                  <div style={{ display: "grid", gap: 30 }}>
                    <div><Label>Your name</Label><input style={inputStyle} value={form.name} onChange={e => update("name", e.target.value)} placeholder="Jane Doe" /></div>
                    <div><Label>Email</Label><input style={inputStyle} type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="jane@example.com" /></div>
                    <div><Label>Phone (optional)</Label><input style={inputStyle} value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+1 555 123 4567" /></div>
                    <div><Label>Anything else we should know?</Label>
                      <textarea value={form.notes} onChange={e => update("notes", e.target.value)} rows={4} style={{ ...inputStyle, borderBottom: "1px solid var(--rule)", resize: "vertical" }} placeholder="First trip to India, travelling with my mother, love cardamom..." />
                    </div>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <h2 className="serif" style={{ fontSize: 40, letterSpacing: "-0.02em", margin: "0 0 24px" }}>Ready to send.</h2>
                  <p style={{ color: "var(--ink-2)", lineHeight: 1.7, fontSize: 16, marginBottom: 30 }}>
                    Here&rsquo;s what we&rsquo;ll receive. We&rsquo;ll write back personally — usually within a day, always in our own words.
                  </p>
                  <div style={{ border: "1px solid var(--rule)", padding: 30, borderRadius: 4, display: "grid", gap: 16, fontSize: 15 }}>
                    <Row l="Program" r={pkg.title} />
                    <Row l="Dates" r={form.checkin && form.checkout ? form.checkin + " → " + form.checkout : "Flexible"} />
                    <Row l="Guests" r={form.guests + (form.guests === 1 ? " person" : " people")} />
                    <Row l="Dietary" r={form.diet.length ? form.diet.join(", ") : "No restrictions"} />
                    <Row l="Name" r={form.name || "—"} />
                    <Row l="Email" r={form.email || "—"} />
                    {form.notes && <Row l="Notes" r={form.notes} />}
                  </div>
                </div>
              )}

              {submitState.message && (
                <div
                  style={{
                    marginTop: 28,
                    padding: "16px 18px",
                    borderRadius: 4,
                    border: "1px solid " + (submitState.type === "error" ? "rgba(139,58,31,0.35)" : "rgba(78,102,55,0.35)"),
                    background: submitState.type === "error" ? "rgba(139,58,31,0.08)" : "rgba(78,102,55,0.08)",
                    color: submitState.type === "error" ? "var(--accent)" : "var(--accent-2)",
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  {submitState.message}
                </div>
              )}

              <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button onClick={() => step > 1 ? setStep(step - 1) : setPage("home")} disabled={submitting} style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: submitting ? "not-allowed" : "pointer", fontSize: 14, opacity: submitting ? 0.5 : 1 }}>
                  ← {step > 1 ? "Back" : "Cancel"}
                </button>
                {step < 4 ? (
                  <button onClick={() => setStep(step + 1)} style={{ background: "var(--ink)", color: "var(--paper)", border: "none", padding: "14px 26px", borderRadius: 999, fontSize: 14, cursor: "pointer" }}>
                    Continue →
                  </button>
                ) : (
                  <button onClick={submitEnquiry} disabled={submitting} style={{ background: "var(--accent)", color: "var(--paper)", border: "none", padding: "14px 26px", borderRadius: 999, fontSize: 14, cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.75 : 1 }}>
                    {submitting ? "Sending..." : "Send enquiry →"}
                  </button>
                )}
              </div>
            </div>

            {/* Summary sidebar */}
            <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
              <div style={{ border: "1px solid var(--rule)", background: "var(--paper-2)", padding: 26, borderRadius: 4 }}>
                <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 14 }}>Your enquiry</div>
                <div className="serif" style={{ fontSize: 26, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{pkg.title}</div>
                <div style={{ marginTop: 20, fontSize: 14, color: "var(--ink-2)", display: "grid", gap: 8 }}>
                  <Row compact l={pkg.nights === 0 ? "Format" : "Nights"} r={pkg.nights === 0 ? "Day" : pkg.nights === null ? "Custom" : nights} />
                  <Row compact l="Guests" r={form.guests} />
                  <Row compact l="Pricing" r={perPerson ? <>per guest</> : (soloPrice ? <>tiered</> : <>on request</>)} />
                </div>
                {indicativeInr ? (
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--rule)" }}>
                    <div className="mono tracked" style={{ color: "var(--muted)" }}>Indicative total</div>
                    <div className="serif" style={{ fontSize: 44, letterSpacing: "-0.02em", marginTop: 6, lineHeight: 1.05 }}>
                      <PriceB inr={indicativeInr} currency={currency} />
                    </div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Confirmed after we reply</div>
                  </div>
                ) : (
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--rule)" }}>
                    <div className="mono tracked" style={{ color: "var(--muted)" }}>Pricing</div>
                    <div className="serif" style={{ fontSize: 30, letterSpacing: "-0.02em", marginTop: 6, lineHeight: 1.1 }}>On request</div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>We&rsquo;ll quote within a day</div>
                  </div>
                )}
              </div>
              <div style={{ marginTop: 20, fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }} className="mono">
                This is an enquiry — no payment taken. A 25–30% deposit secures the booking once we confirm availability.
              </div>
            </div>
          </div>
        </ContB>
      </SectionB>
    </div>
  );
}

function Row({ l, r, compact }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 20, fontSize: compact ? 13 : 15 }}>
      <span style={{ color: "var(--muted)" }}>{l}</span>
      <span style={{ color: "var(--ink)", textAlign: "right", maxWidth: "60%" }}>{r}</span>
    </div>
  );
}

window.Pages = window.Pages || {};
window.Pages.BookPage = BookPage;

}

{
// Deep package detail page — full itinerary, pricing, inclusions
// Renders dynamically based on slug.

const { Img: ImgD, Section: SectionD, Container: ContD, Eyebrow: EyebrowD, Btn: BtnD, Price: PriceD } = window.UI;
const { PACKAGES: PKD, BRAND: BD } = window.DATA;

function PackageDetailPage({ slug, onBook, setPage, currency, openPackage }) {
  const pkg = PKD.find(p => p.slug === slug) || PKD[0];

  // Pick related packages by category
  const related = PKD.filter(p => p.id !== pkg.id && p.category === pkg.category).slice(0, 3);
  const relatedCross = PKD.filter(p => p.id !== pkg.id && p.category !== pkg.category).slice(0, 3);
  const relatedShown = related.length >= 2 ? related : relatedCross;

  const durLabel = pkg.nights === 0 ? "Day program" : pkg.nights === null ? "Tailor-made" : `${pkg.nights} nights · ${pkg.days} days`;

  return (
    <div>
      {/* Header */}
      <SectionD style={{ padding: "40px 0 30px" }}>
        <ContD>
          <button onClick={() => setPage("experiences")} style={{ background: "transparent", border: "none", color: "var(--muted)", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 28 }}>
            ← All experiences
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60, alignItems: "end" }}>
            <div>
              <EyebrowD>{pkg.category === "wellness" ? "Monsoon Wellness" : pkg.category === "day" ? "Day program" : pkg.category === "tailor" ? "Tailor-made" : pkg.category === "cultural" ? "Cultural retreat" : "Culinary residency"} · {durLabel}</EyebrowD>
              <h1 className="serif" style={{ fontSize: "clamp(56px, 7vw, 116px)", lineHeight: 0.95, margin: "20px 0 18px", letterSpacing: "-0.03em" }}>
                {pkg.title}
              </h1>
              <p style={{ fontSize: 20, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: 640, marginTop: 12, fontFamily: "'Fraunces', serif", fontWeight: 300 }}>
                {pkg.longBlurb || pkg.blurb}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <BtnD onClick={onBook} variant="accent">Request this program</BtnD>
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.14em", textAlign: "right" }}>
                {pkg.groupSize ? `Max ${pkg.groupSize.max} guests · ` : ""}{pkg.notes ? "All-inclusive" : ""}
              </div>
            </div>
          </div>
        </ContD>
      </SectionD>

      {/* Hero image */}
      <SectionD style={{ padding: "20px 0" }}>
        <ContD>
          <ImgD src={pkg.img} alt={pkg.title} ratio="21/9" />
        </ContD>
      </SectionD>

      {/* Highlights + season banner */}
      <SectionD style={{ padding: "60px 0 40px" }}>
        <ContD>
          {pkg.season && (
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--rule)", padding: "20px 28px", marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 30, flexWrap: "wrap" }}>
              <div>
                <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 4 }}>Seasonal program</div>
                <div className="serif" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>{pkg.season}</div>
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-2)", maxWidth: 460, lineHeight: 1.55 }}>
                The farm changes character with the monsoon — green, washed-clean, slow. This is when our Ayurvedic programs run.
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <EyebrowD>Highlights</EyebrowD>
              <h2 className="serif" style={{ fontSize: 38, letterSpacing: "-0.02em", margin: "16px 0 24px", lineHeight: 1.1 }}>
                What makes this one ours.
              </h2>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}>
              {pkg.highlights.map((h, i) => (
                <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 18, alignItems: "baseline", borderTop: "1px solid var(--rule)", paddingTop: 16 }}>
                  <div className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.14em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="serif" style={{ fontSize: 22, lineHeight: 1.35, letterSpacing: "-0.005em" }}>{h}</div>
                </li>
              ))}
            </ul>
          </div>
        </ContD>
      </SectionD>

      {/* Itinerary */}
      <SectionD style={{ background: "var(--paper-2)", padding: "100px 0" }}>
        <ContD>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <EyebrowD>Itinerary</EyebrowD>
              <h2 className="serif" style={{ fontSize: 48, letterSpacing: "-0.025em", margin: "18px 0 22px", lineHeight: 1.05 }}>
                How the {pkg.nights === 0 ? "day" : pkg.nights === null ? "stay" : "week"} <span className="italic-serif">unfolds</span>.
              </h2>
              <p style={{ color: "var(--ink-2)", lineHeight: 1.65, fontSize: 15, maxWidth: 360 }}>
                A plan we&rsquo;ll adapt to your group on arrival. Madhu builds the kitchen days around what you tell us you love to eat.
              </p>
            </div>
            <div style={{ display: "grid", gap: 0 }}>
              {pkg.itinerary.map((d, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 30, padding: "26px 0", borderTop: "1px solid var(--rule)", borderBottom: i === pkg.itinerary.length - 1 ? "1px solid var(--rule)" : "none" }}>
                  <div className="mono tracked" style={{ color: "var(--accent)", paddingTop: 4 }}>{d.day}</div>
                  <div>
                    <div className="serif" style={{ fontSize: 24, letterSpacing: "-0.01em", marginBottom: 6 }}>{d.title}</div>
                    <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: 640 }}>{d.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContD>
      </SectionD>

      {/* Pricing */}
      <SectionD style={{ padding: "100px 0" }}>
        <ContD>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
            <div>
              <EyebrowD>Pricing</EyebrowD>
              <h2 className="serif" style={{ fontSize: 48, letterSpacing: "-0.025em", margin: "18px 0 22px", lineHeight: 1.05 }}>
                {pkg.pricing?.onRequest ? <>Pricing on <span className="italic-serif">request</span>.</> : <>What it <span className="italic-serif">costs</span>.</>}
              </h2>
              <p style={{ color: "var(--ink-2)", lineHeight: 1.65, fontSize: 15, maxWidth: 360 }}>
                {pkg.pricing?.onRequest
                  ? "Because this program is tailored — to dates, group size, and what you'd most like to do — we quote on enquiry. Write to us, and we'll write back within a day."
                  : "All-inclusive. Bungalow, all meals, cooking sessions, all itinerary excursions, bottled water. Excludes only the taxi from the airport and tips."}
              </p>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 20, fontFamily: "'IBM Plex Mono', monospace" }}>
                Valid until {BD.validUntil}. International prices approximate.
              </p>
            </div>
            <div>
              <PricingTable pkg={pkg} currency={currency} />
              <button onClick={onBook} style={{ marginTop: 28, background: "var(--accent)", color: "var(--paper)", border: "none", padding: "16px 26px", borderRadius: 999, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
                Request to book →
              </button>
            </div>
          </div>
        </ContD>
      </SectionD>

      {/* Practical info */}
      <SectionD style={{ background: "var(--paper-2)", padding: "100px 0" }}>
        <ContD>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            <div>
              <EyebrowD>Practical</EyebrowD>
              <h3 className="serif" style={{ fontSize: 36, letterSpacing: "-0.02em", margin: "16px 0 24px" }}>The fine print.</h3>
              <dl style={{ display: "grid", gap: 18, margin: 0 }}>
                {pkg.groupSize && (
                  <Detail label="Group size" value={pkg.groupSize.min ? `${pkg.groupSize.min}–${pkg.groupSize.max} guests` : `Max ${pkg.groupSize.max} guests`} />
                )}
                {pkg.flexibleStart && <Detail label="Start day" value={pkg.flexibleStart} />}
                {pkg.bestTime && <Detail label="Best time to visit" value={pkg.bestTime} />}
                {pkg.season && <Detail label="Seasonal availability" value={pkg.season} />}
                <Detail label="Cuisine" value="100% vegetarian / vegan" />
                <Detail label="Skill level" value="All levels welcome" />
              </dl>
            </div>
            <div>
              <EyebrowD>Inclusions & exclusions</EyebrowD>
              <h3 className="serif" style={{ fontSize: 36, letterSpacing: "-0.02em", margin: "16px 0 24px" }}>What&rsquo;s in, what&rsquo;s not.</h3>
              <div className="serif italic-serif" style={{ fontSize: 18, color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 18 }}>{pkg.notes}</div>
              <div style={{ display: "grid", gap: 8, marginTop: 20 }}>
                <RowItem ok label="Bungalow (AC, en-suite, solar hot water)" />
                <RowItem ok label="All meals (vegetarian/vegan, dietary needs accommodated)" />
                <RowItem ok label="All cooking sessions and excursions in the itinerary" />
                <RowItem ok label="Bottled water throughout" />
                <RowItem label="Taxi from Kochi airport (we arrange, ~Rs 3,500)" />
                <RowItem label="Tips for the team (entirely at your discretion)" />
              </div>
            </div>
          </div>
        </ContD>
      </SectionD>

      {/* CTA */}
      <SectionD style={{ padding: "100px 0", background: "var(--accent)", color: "var(--paper)" }}>
        <ContD style={{ textAlign: "center" }}>
          <EyebrowD color="rgba(243,237,226,0.7)">Ready when you are</EyebrowD>
          <div className="serif" style={{ fontSize: "clamp(48px, 6vw, 100px)", lineHeight: 0.95, margin: "24px 0 30px", letterSpacing: "-0.03em" }}>
            Write to us about<br /><span className="italic-serif">{pkg.title.toLowerCase()}</span>.
          </div>
          <button onClick={onBook} style={{ background: "var(--paper)", color: "var(--ink)", border: "none", padding: "16px 28px", borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
            Request to book →
          </button>
        </ContD>
      </SectionD>

      {/* Related */}
      {relatedShown.length > 0 && (
        <SectionD style={{ padding: "100px 0" }}>
          <ContD>
            <EyebrowD>You might also like</EyebrowD>
            <h3 className="serif" style={{ fontSize: 42, letterSpacing: "-0.025em", margin: "16px 0 40px" }}>Other programs guests pair with this one.</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
              {relatedShown.map(r => {
                const minPrice = r.pricing.solo ?? r.pricing.perPerson;
                return (
                  <div key={r.id} style={{ cursor: "pointer" }} onClick={() => openPackage(r.slug)}>
                    <ImgD src={r.img} alt={r.title} ratio="4/5" />
                    <div className="mono tracked" style={{ color: "var(--muted)", marginTop: 14 }}>
                      {r.nights === 0 ? "Day" : r.nights === null ? "Custom" : r.nights + "N / " + r.days + "D"}
                      {minPrice ? <> · from <PriceD inr={minPrice} currency={currency} /></> : null}
                    </div>
                    <div className="serif" style={{ fontSize: 24, lineHeight: 1.2, margin: "8px 0 6px" }}>{r.title}</div>
                    <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: 0 }}>{r.blurb}</p>
                  </div>
                );
              })}
            </div>
          </ContD>
        </SectionD>
      )}
    </div>
  );
}

function PricingTable({ pkg, currency }) {
  if (pkg.pricing?.onRequest) {
    return (
      <div style={{ border: "1px solid var(--rule)", padding: 40, background: "var(--paper-2)" }}>
        <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 18 }}>Bespoke pricing</div>
        <div className="serif" style={{ fontSize: 48, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 18 }}>
          We quote on enquiry.
        </div>
        <p style={{ color: "var(--ink-2)", lineHeight: 1.65, fontSize: 15, margin: 0 }}>
          {pkg.notes}
        </p>
      </div>
    );
  }

  if (pkg.pricing?.perPerson) {
    return (
      <div style={{ border: "1px solid var(--rule)", padding: 40, background: "var(--paper-2)" }}>
        <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 12 }}>Per guest</div>
        <div className="serif" style={{ fontSize: 64, letterSpacing: "-0.02em", lineHeight: 1 }}>
          <PriceD inr={pkg.pricing.perPerson} currency={currency} />
        </div>
        <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
          Includes meals and bottled water.
        </div>
      </div>
    );
  }

  // Multi-tier (residency)
  const rows = [
    pkg.pricing.solo != null && { label: "Solo (private double room)", price: pkg.pricing.solo },
    pkg.pricing.twin != null && { label: "Two travellers (twin/double room)", price: pkg.pricing.twin },
    pkg.pricing.twinWithGuest != null && { label: "One cook + one guest (sharing)", price: pkg.pricing.twinWithGuest },
    pkg.pricing.twinBothCook != null && { label: "Two cooks (sharing)", price: pkg.pricing.twinBothCook },
    pkg.pricing.twinBothTravel != null && { label: "Two travellers (sharing)", price: pkg.pricing.twinBothTravel },
  ].filter(Boolean);

  return (
    <div style={{ border: "1px solid var(--rule)", background: "var(--paper-2)" }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 30, padding: "26px 30px", borderTop: i > 0 ? "1px solid var(--rule)" : "none", alignItems: "center" }}>
          <div>
            <div className="serif" style={{ fontSize: 20, letterSpacing: "-0.005em", lineHeight: 1.2 }}>{r.label}</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 6, letterSpacing: "0.08em" }}>
              All-inclusive · for the {pkg.nights} nights
            </div>
          </div>
          <div className="serif" style={{ fontSize: 36, letterSpacing: "-0.02em", color: "var(--accent)" }}>
            <PriceD inr={r.price} currency={currency} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

function RowItem({ ok, label }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--ink-2)" }}>
      <span style={{ color: ok ? "var(--accent-2)" : "var(--muted)", fontSize: 14, marginTop: 1 }}>{ok ? "✓" : "—"}</span>
      <span>{label}</span>
    </div>
  );
}

window.Pages = window.Pages || {};
window.Pages.PackageDetailPage = PackageDetailPage;

}

{
// Tweaks panel — palette, hero variant, density, sitemap overlay

function TweaksPanel({ tweaks, setTweaks }) {
  const [open, setOpen] = React.useState(true);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") setActive(true);
      if (e.data?.type === "__deactivate_edit_mode") setActive(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  if (!active) return null;

  const update = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };

  const palettes = [
    { key: "clay", label: "Clay & Forest", swatch: ["#8B3A1F", "#2F3E2A", "#F3EDE2"] },
    { key: "pepper", label: "Pepper & Paper", swatch: ["#6B1E1E", "#2A2A1F", "#F1ECE0"] },
    { key: "turmeric", label: "Turmeric", swatch: ["#B4541A", "#E29A2D", "#F6EFDC"] },
    { key: "monsoon", label: "Monsoon", swatch: ["#1F4435", "#22303A", "#ECEDE5"] },
    { key: "cardamom", label: "Cardamom", swatch: ["#4E6637", "#B78A3C", "#EEEDE3"] },
  ];

  return (
    <div style={{
      position: "fixed",
      right: 20,
      top: 90,
      width: open ? 280 : 44,
      background: "var(--paper)",
      border: "1px solid var(--rule)",
      borderRadius: 6,
      boxShadow: "0 20px 60px -20px rgba(0,0,0,0.25)",
      zIndex: 50,
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderBottom: open ? "1px solid var(--rule)" : "none" }}>
        {open && <div className="mono tracked" style={{ color: "var(--ink)" }}>Tweaks</div>}
        <button onClick={() => setOpen(!open)} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 14 }}>
          {open ? "−" : "+"}
        </button>
      </div>
      {open && (
        <div style={{ padding: 16, display: "grid", gap: 22 }}>
          <div>
            <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 10, fontSize: 10 }}>Palette</div>
            <div style={{ display: "grid", gap: 6 }}>
              {palettes.map(p => (
                <button key={p.key} onClick={() => update("palette", p.key)} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 10px",
                  border: "1px solid " + (tweaks.palette === p.key ? "var(--ink)" : "var(--rule)"),
                  background: tweaks.palette === p.key ? "var(--paper-2)" : "transparent",
                  borderRadius: 4, cursor: "pointer", fontSize: 12, fontFamily: "inherit",
                }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {p.swatch.map((c, i) => <div key={i} style={{ width: 14, height: 14, background: c, borderRadius: 2 }} />)}
                  </div>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 10, fontSize: 10 }}>Hero layout</div>
            <div style={{ display: "grid", gap: 4 }}>
              {[
                ["editorial",   "Editorial — magazine spread"],
                ["cinematic",   "Cinematic — full-bleed photo"],
                ["split",       "Split — classic two-column"],
                ["postcard",    "Postcard — travel diary"],
                ["menu",        "Menu — today's table"],
                ["topographic", "Topographic — map-led"],
                ["poster",      "Poster — fashion-mag bold"],
              ].map(([v, label]) => (
                <button key={v} onClick={() => update("heroLayout", v)} style={{
                  padding: "8px 10px", border: "1px solid " + (tweaks.heroLayout === v ? "var(--ink)" : "var(--rule)"),
                  background: tweaks.heroLayout === v ? "var(--ink)" : "transparent",
                  color: tweaks.heroLayout === v ? "var(--paper)" : "var(--ink)",
                  borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "inherit", textAlign: "left",
                }}>{label}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 10, fontSize: 10 }}>Density</div>
            <div style={{ display: "flex", gap: 4 }}>
              {[["airy", "Airy"], ["medium", "Medium"], ["dense", "Dense"]].map(([v, l]) => (
                <button key={v} onClick={() => update("density", v)} style={{
                  flex: 1, padding: "8px 10px",
                  border: "1px solid " + (tweaks.density === v ? "var(--ink)" : "var(--rule)"),
                  background: tweaks.density === v ? "var(--ink)" : "transparent",
                  color: tweaks.density === v ? "var(--paper)" : "var(--ink)",
                  borderRadius: 4, cursor: "pointer", fontSize: 12, fontFamily: "inherit",
                }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 10, fontSize: 10 }}>Sitemap overlay</div>
            <button onClick={() => update("sitemapOverlay", !tweaks.sitemapOverlay)} style={{
              width: "100%",
              padding: "8px 10px",
              border: "1px solid " + (tweaks.sitemapOverlay ? "var(--accent)" : "var(--rule)"),
              background: tweaks.sitemapOverlay ? "var(--accent)" : "transparent",
              color: tweaks.sitemapOverlay ? "var(--paper)" : "var(--ink)",
              borderRadius: 4, cursor: "pointer", fontSize: 12, fontFamily: "inherit",
            }}>{tweaks.sitemapOverlay ? "Showing" : "Show proposed IA"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

window.TweaksPanel = TweaksPanel;

}

{
// App shell — wires pages, navigation, tweaks, currency, package routing, mobile mockup.

function App() {
  const [tweaks, setTweaks] = React.useState(window.__TWEAKS__);
  const [page, setPage] = React.useState("home");
  const [pkgSlug, setPkgSlug] = React.useState(null);
  const [currency, setCurrency] = React.useState("INR");
  const [showSitemap, setShowSitemap] = React.useState(false);
  const [showMobile, setShowMobile] = React.useState(false);

  // Apply tweaks to body
  React.useEffect(() => {
    document.body.dataset.palette = tweaks.palette || "clay";
    document.body.dataset.density = tweaks.density || "medium";
  }, [tweaks]);

  React.useEffect(() => {
    if (tweaks.sitemapOverlay) setShowSitemap(true);
  }, [tweaks.sitemapOverlay]);

  React.useEffect(() => { window.scrollTo(0, 0); }, [page, pkgSlug]);

  const onBook = () => { setPkgSlug(null); setPage("book"); };
  const openPackage = (slug) => { setPkgSlug(slug); setPage("packageDetail"); };
  const navigateTo = (p) => { setPkgSlug(null); setPage(p); };

  const { TopNav, Footer, SitemapOverlay } = window.Nav;
  const { HomePage, AboutPage, StayPage, ExperiencesPage, FarmPage, JournalPage, PlanPage, TermsPage, BookPage, PackageDetailPage } = window.Pages;

  const renderPage = () => {
    switch (page) {
      case "home":           return <HomePage setPage={navigateTo} onBook={onBook} heroLayout={tweaks.heroLayout} currency={currency} openPackage={openPackage} />;
      case "about":          return <AboutPage setPage={navigateTo} onBook={onBook} />;
      case "stay":           return <StayPage setPage={navigateTo} onBook={onBook} currency={currency} />;
      case "experiences":    return <ExperiencesPage onBook={onBook} currency={currency} setCurrency={setCurrency} openPackage={openPackage} />;
      case "farm":           return <FarmPage onBook={onBook} />;
      case "journal":        return <JournalPage />;
      case "plan":           return <PlanPage onBook={onBook} />;
      case "terms":          return <TermsPage setPage={navigateTo} onBook={onBook} />;
      case "book":           return <BookPage setPage={navigateTo} initialPkg={pkgSlug} currency={currency} />;
      case "packageDetail":  return <PackageDetailPage slug={pkgSlug} onBook={onBook} setPage={navigateTo} currency={currency} openPackage={openPackage} />;
      default:               return <HomePage setPage={navigateTo} onBook={onBook} heroLayout={tweaks.heroLayout} currency={currency} openPackage={openPackage} />;
    }
  };

  return (
    <div className="app" data-screen-label={`page:${page}${pkgSlug ? ":" + pkgSlug : ""}`}>
      <TopNav page={page === "packageDetail" ? "experiences" : page} setPage={navigateTo} onBook={onBook} showSitemap={showSitemap} setShowSitemap={setShowSitemap} />
      {renderPage()}
      <Footer setPage={navigateTo} onBook={onBook} />
      {page !== "book" && (
        <div style={{ position: "fixed", left: 20, bottom: 20, zIndex: 45 }}>
          <button onClick={() => setShowMobile(true)} style={{
            background: "var(--ink)", color: "var(--paper)", border: "none",
            padding: "12px 16px", borderRadius: 999, cursor: "pointer", fontSize: 12,
            display: "flex", alignItems: "center", gap: 8,
          }} className="mono">
            <span style={{ fontSize: 14 }}>📱</span> View mobile
          </button>
        </div>
      )}
      <MobileMockup open={showMobile} onClose={() => setShowMobile(false)} page={page} setPage={navigateTo} onBook={onBook} currency={currency} />
      <SitemapOverlay open={showSitemap} onClose={() => { setShowSitemap(false); setTweaks(t => ({ ...t, sitemapOverlay: false })); }} setPage={navigateTo} />
      <window.TweaksPanel tweaks={tweaks} setTweaks={setTweaks} />
    </div>
  );
}

function MobileMockup({ open, onClose, page, setPage, onBook, currency }) {
  if (!open) return null;
  const { Img, Btn, Price } = window.UI;
  const { IMG, NAV, PACKAGES } = window.DATA;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 55,
      background: "rgba(31,26,21,0.92)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 30,
    }}>
      <button onClick={onClose} style={{
        position: "absolute", top: 24, right: 24,
        background: "transparent", border: "1px solid rgba(243,237,226,0.3)", color: "var(--paper)",
        padding: "8px 14px", borderRadius: 999, cursor: "pointer", fontSize: 13,
      }} className="mono">✕ Close</button>

      <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
        <div className="phone-frame">
          <div className="phone-screen" style={{ overflowY: "auto" }}>
            <div style={{ padding: "48px 20px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent)", color: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>P</div>
                  <div className="serif" style={{ fontSize: 16 }}>The Pimenta</div>
                </div>
                <div style={{ fontSize: 18, color: "var(--ink)" }}>≡</div>
              </div>
              <div className="mono tracked" style={{ color: "var(--muted)", fontSize: 9, marginTop: 18 }}>Kerala midlands · farm 1962</div>
              <div className="serif" style={{ fontSize: 44, lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: 10 }}>
                Cook.<br /><span className="italic-serif" style={{ color: "var(--accent)" }}>Stay</span>.<br />Wander.
              </div>
              <div style={{ marginTop: 14 }}>
                <Img src={IMG.hero} alt="hero" ratio="4/5" />
              </div>
              <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, marginTop: 14 }}>
                A small, family-run homestay in Kerala&rsquo;s midlands. Hands-on vegetarian cooking, cultural day-trips, long afternoons.
              </p>
              <button onClick={onBook} style={{ width: "100%", background: "var(--ink)", color: "var(--paper)", border: "none", padding: 14, borderRadius: 999, fontSize: 13, marginTop: 14 }}>
                Request to book →
              </button>

              <div style={{ marginTop: 28 }}>
                <div className="mono tracked" style={{ color: "var(--muted)", fontSize: 9, marginBottom: 10 }}>Experiences</div>
                <div style={{ display: "grid", gap: 12 }}>
                  {PACKAGES.slice(2, 5).map(p => (
                    <div key={p.id} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 10 }}>
                      <Img src={p.img} alt={p.title} ratio="1/1" />
                      <div>
                        <div className="mono" style={{ fontSize: 9, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                          {p.nights === 0 ? "Day" : p.nights + "N"} · {p.pricing?.solo ? <Price inr={p.pricing.solo} currency={currency} /> : p.pricing?.perPerson ? <Price inr={p.pricing.perPerson} currency={currency} /> : "On req"}
                        </div>
                        <div className="serif" style={{ fontSize: 15, lineHeight: 1.15, marginTop: 3 }}>{p.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="phone-frame">
          <div className="phone-screen" style={{ overflowY: "auto" }}>
            <div style={{ padding: "48px 20px 20px" }}>
              <div className="mono tracked" style={{ color: "var(--muted)", fontSize: 9 }}>Experiences</div>
              <div className="serif" style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-0.03em", marginTop: 8 }}>
                Eleven<br />programs.
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 16, overflowX: "auto", paddingBottom: 6 }}>
                {["All", "Day", "Culinary", "Cultural", "Wellness"].map((l, i) => (
                  <span key={l} style={{
                    padding: "6px 12px", borderRadius: 999, fontSize: 11,
                    border: "1px solid " + (i === 0 ? "var(--ink)" : "var(--rule)"),
                    background: i === 0 ? "var(--ink)" : "transparent",
                    color: i === 0 ? "var(--paper)" : "var(--ink-2)",
                    whiteSpace: "nowrap",
                  }}>{l}</span>
                ))}
              </div>
              <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                {PACKAGES.slice(2, 6).map(p => (
                  <div key={p.id} style={{ border: "1px solid var(--rule)", padding: 10, borderRadius: 4 }}>
                    <Img src={p.img} alt={p.title} ratio="4/3" />
                    <div style={{ marginTop: 10 }}>
                      <div className="mono" style={{ fontSize: 9, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        {p.nights === 0 ? "Day" : p.nights + "N / " + p.days + "D"} · {p.focus}
                      </div>
                      <div className="serif" style={{ fontSize: 17, lineHeight: 1.15, marginTop: 4 }}>{p.title}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                        <div className="serif" style={{ fontSize: 16 }}>
                          {p.pricing?.solo ? <Price inr={p.pricing.solo} currency={currency} /> : p.pricing?.perPerson ? <Price inr={p.pricing.perPerson} currency={currency} /> : "—"}
                        </div>
                        <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "6px 12px", borderRadius: 999, fontSize: 10 }}>View →</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="phone-frame">
          <div className="phone-screen" style={{ overflowY: "auto" }}>
            <div style={{ padding: "48px 20px 20px" }}>
              <div className="mono tracked" style={{ color: "var(--muted)", fontSize: 9 }}>Request to book</div>
              <div className="serif" style={{ fontSize: 34, lineHeight: 1, letterSpacing: "-0.03em", marginTop: 8 }}>
                When are<br />you coming?
              </div>
              <div style={{ display: "flex", gap: 4, marginTop: 18 }}>
                {[1, 2, 3, 4].map(n => (
                  <div key={n} style={{ flex: 1, height: 3, background: n <= 2 ? "var(--accent)" : "var(--rule)", borderRadius: 2 }} />
                ))}
              </div>
              <div style={{ marginTop: 20 }}>
                <div className="mono tracked" style={{ color: "var(--muted)", fontSize: 9, marginBottom: 6 }}>Check in</div>
                <div style={{ borderBottom: "1px solid var(--rule)", paddingBottom: 8, fontSize: 14 }}>22 Apr 2026</div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div className="mono tracked" style={{ color: "var(--muted)", fontSize: 9, marginBottom: 6 }}>Check out</div>
                <div style={{ borderBottom: "1px solid var(--rule)", paddingBottom: 8, fontSize: 14 }}>26 Apr 2026</div>
              </div>
              <div style={{ marginTop: 20 }}>
                <div className="mono tracked" style={{ color: "var(--muted)", fontSize: 9, marginBottom: 8 }}>Guests</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <div key={n} style={{
                      width: 34, height: 34, borderRadius: "50%",
                      border: "1px solid " + (n === 2 ? "var(--ink)" : "var(--rule)"),
                      background: n === 2 ? "var(--ink)" : "transparent",
                      color: n === 2 ? "var(--paper)" : "var(--ink)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
                    }}>{n}</div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 22, background: "var(--paper-2)", padding: 14, borderRadius: 4 }}>
                <div className="mono tracked" style={{ color: "var(--accent)", fontSize: 9, marginBottom: 6 }}>Indicative total</div>
                <div className="serif" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>
                  <Price inr={75953 * 2} currency={currency} />
                </div>
                <div className="mono" style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>Kerala Cooking Residency · 2 guests</div>
              </div>
              <button style={{ width: "100%", background: "var(--accent)", color: "var(--paper)", border: "none", padding: 14, borderRadius: 999, fontSize: 13, marginTop: 14 }}>
                Continue →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

prototypeAppCache = App;

return App;

}
}

export default function PimentaPrototype() {
  const [App, setApp] = React.useState(null);

  const [loadError, setLoadError] = React.useState("");

  React.useEffect(() => {
    let active = true;

    async function bootstrap() {
      let content = DEFAULT_SITE_CONTENT;

      try {
        const response = await fetch("/api/content", { cache: "no-store" });
        if (response.ok) {
          const result = await response.json();
          if (result?.content) {
            content = result.content;
          }
        }
      } catch {
        // Fall back to the bundled default content.
      }

      if (!active) {
        return;
      }

      try {
        setApp(() => createPrototypeApp(content));
      } catch (error) {
        setLoadError(error?.message || "Unable to load the site.");
      }
    }

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  if (loadError) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--paper)', color: 'var(--ink)', padding: 24 }}>
        <div style={{ maxWidth: 560, textAlign: 'center' }}>
          <div className="serif" style={{ fontSize: 42, lineHeight: 1, marginBottom: 16 }}>We hit a loading problem.</div>
          <div style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}>{loadError}</div>
        </div>
      </div>
    );
  }

  if (!App) {
    return <div style={{ minHeight: '100vh', background: 'var(--paper)' }} />;
  }

  return App ? <App /> : null;
}
