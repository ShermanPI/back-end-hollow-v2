import express from "express";
import type { NextFunction, Express, Request, Response } from "express";
import type { AllowedColors } from "./utils/allowedColors.ts";
import { consoleColorsOptions } from "./utils/allowedColors.ts";

const app: Express = express();
const PORT = 3000;

const DUMMY_CHARACTERS = [
  {
    id: 1,
    listIndex: 0,
    characterImgSrc: "https://placehold.co/200x200?text=Character+1",
    characterName: "John Smith",
    characterMainInfo: "Software Engineer",
    characterSecondaryInfo: "New York, USA",
  },
  {
    id: 2,
    listIndex: 1,
    characterImgSrc: "https://placehold.co/200x200?text=Character+2",
    characterName: "Emily Johnson",
    characterMainInfo: "Product Designer",
    characterSecondaryInfo: "London, UK",
  },
  {
    id: 3,
    listIndex: 2,
    characterImgSrc: "https://placehold.co/200x200?text=Character+3",
    characterName: "Michael Brown",
    characterMainInfo: "Data Analyst",
    characterSecondaryInfo: "Toronto, Canada",
  },
  {
    id: 4,
    listIndex: 3,
    characterImgSrc: "https://placehold.co/200x200?text=Character+4",
    characterName: "Sophia Williams",
    characterMainInfo: "UX Researcher",
    characterSecondaryInfo: "Sydney, Australia",
  },
  {
    id: 5,
    listIndex: 4,
    characterImgSrc: "https://placehold.co/200x200?text=Character+5",
    characterName: "Daniel Garcia",
    characterMainInfo: "Frontend Developer",
    characterSecondaryInfo: "Madrid, Spain",
  },
  {
    id: 6,
    listIndex: 5,
    characterImgSrc: "https://placehold.co/200x200?text=Character+6",
    characterName: "Olivia Martinez",
    characterMainInfo: "Marketing Specialist",
    characterSecondaryInfo: "Mexico City, Mexico",
  },
  {
    id: 7,
    listIndex: 6,
    characterImgSrc: "https://placehold.co/200x200?text=Character+7",
    characterName: "James Wilson",
    characterMainInfo: "Backend Developer",
    characterSecondaryInfo: "Chicago, USA",
  },
  {
    id: 8,
    listIndex: 7,
    characterImgSrc: "https://placehold.co/200x200?text=Character+8",
    characterName: "Isabella Anderson",
    characterMainInfo: "Illustrator",
    characterSecondaryInfo: "Rome, Italy",
  },
  {
    id: 9,
    listIndex: 8,
    characterImgSrc: "https://placehold.co/200x200?text=Character+9",
    characterName: "William Thomas",
    characterMainInfo: "DevOps Engineer",
    characterSecondaryInfo: "Berlin, Germany",
  },
  {
    id: 10,
    listIndex: 9,
    characterImgSrc: "https://placehold.co/200x200?text=Character+10",
    characterName: "Ava Taylor",
    characterMainInfo: "Content Strategist",
    characterSecondaryInfo: "Paris, France",
  },
  {
    id: 11,
    listIndex: 10,
    characterImgSrc: "https://placehold.co/200x200?text=Character+11",
    characterName: "Benjamin Moore",
    characterMainInfo: "Cloud Architect",
    characterSecondaryInfo: "Seattle, USA",
  },
  {
    id: 12,
    listIndex: 11,
    characterImgSrc: "https://placehold.co/200x200?text=Character+12",
    characterName: "Mia Jackson",
    characterMainInfo: "Graphic Designer",
    characterSecondaryInfo: "Amsterdam, Netherlands",
  },
  {
    id: 13,
    listIndex: 12,
    characterImgSrc: "https://placehold.co/200x200?text=Character+13",
    characterName: "Lucas White",
    characterMainInfo: "Mobile Developer",
    characterSecondaryInfo: "São Paulo, Brazil",
  },
  {
    id: 14,
    listIndex: 13,
    characterImgSrc: "https://placehold.co/200x200?text=Character+14",
    characterName: "Charlotte Harris",
    characterMainInfo: "Project Manager",
    characterSecondaryInfo: "Dublin, Ireland",
  },
  {
    id: 15,
    listIndex: 14,
    characterImgSrc: "https://placehold.co/200x200?text=Character+15",
    characterName: "Henry Martin",
    characterMainInfo: "Cybersecurity Analyst",
    characterSecondaryInfo: "Tokyo, Japan",
  },
  {
    id: 16,
    listIndex: 15,
    characterImgSrc: "https://placehold.co/200x200?text=Character+16",
    characterName: "Amelia Thompson",
    characterMainInfo: "Business Analyst",
    characterSecondaryInfo: "Auckland, New Zealand",
  },
  {
    id: 17,
    listIndex: 16,
    characterImgSrc: "https://placehold.co/200x200?text=Character+17",
    characterName: "Alexander Lee",
    characterMainInfo: "Database Administrator",
    characterSecondaryInfo: "Seoul, South Korea",
  },
  {
    id: 18,
    listIndex: 17,
    characterImgSrc: "https://placehold.co/200x200?text=Character+18",
    characterName: "Evelyn Clark",
    characterMainInfo: "QA Engineer",
    characterSecondaryInfo: "Vancouver, Canada",
  },
  {
    id: 19,
    listIndex: 18,
    characterImgSrc: "https://placehold.co/200x200?text=Character+19",
    characterName: "Sebastian Lewis",
    characterMainInfo: "AI Engineer",
    characterSecondaryInfo: "Singapore",
  },
  {
    id: 20,
    listIndex: 19,
    characterImgSrc: "https://placehold.co/200x200?text=Character+20",
    characterName: "Grace Walker",
    characterMainInfo: "Technical Writer",
    characterSecondaryInfo: "Barcelona, Spain",
  },
];

app.disable("x-powered-by");

const colorString = (value: string, color: AllowedColors) => {
  return consoleColorsOptions[color] + value + "\x1b[0m";
};

// logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const reqMethod = req.method;
  let methodColor: AllowedColors = "bgGray";

  switch (reqMethod) {
    case "GET":
      methodColor = "bgGreen";
      break;
    case "POST":
      methodColor = "bgBlue";
      break;
  }

  console.log(
    colorString(` ${reqMethod} `, methodColor) +
      ` ${req.headers.origin}` +
      req.url,
  );

  next();
});

// cors middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  const ALLOWED_ORIGINS = ["http://localhost:5173"];

  // just used !origin because the same origin wont send the origin in the headers
  if (!origin || ALLOWED_ORIGINS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "DELETE, OPTIONS, GET, POST");
  }

  next();
});

app.get("/characters", (req: Request, res: Response) => {
  res.json(DUMMY_CHARACTERS);
});

app.get("/login", (req: Request, res: Response) => {
  res.json({});
});

app.get("/charactersSample/:id", (req: Request, res: Response) => {
  const chartacterId = parseInt(req.params.id.toString());
  res.json(DUMMY_CHARACTERS[chartacterId]);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
