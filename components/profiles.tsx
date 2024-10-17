"use client";
import React from "react";
import {
  Card,
  Skeleton,
  Button,
  CardHeader,
  CardBody,
  Image,
  Link,
} from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import EmblaCarouselReact from "embla-carousel-react";
import { GithubIcon } from "./icons";

export default function Profiles() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const profiles = [
    {"name" : "Fayyadh Asady",
      "nim" : "1101220353",
      "role" : "Frontend Developer",
      "github" : "https://github.com/Asady04",
      "image" : "/fayyadh.jpg"
    },
    {"name" : "Ad Dhiya Fahma Bilnadzary Nugraha",
      "nim" : "1101220264",
      "role" : "Backend Developer",
      "github" : "https://github.com/Addhiya",
      "image" : "/adhiya.jpg"
    },
    {"name" : "Made Satya Yudha Prawira",
      "nim" : "1101223369",
      "role" : "Devops Developer",
      "github" : "https://github.com/styydh",
      "image" : "/yudha.jpg"
    },
    {"name" : "Muhammad Ridzwan Aulia Azzikra",
      "nim" : "1101223064",
      "role" : "AI Developer",
      "github" : "https://github.com/Emraaaa",
      "image" : "/ridzwan.jpg"
    },
  ]
  return (
    <div className="w-full flex md:flex-row flex-col gap-3">
      {profiles.map((profile) => (
        <Card className="py-4 hover:-translate-y-1 duration-100">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={profile.image}
            width={270}
            height={300}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <p className="text-tiny uppercase font-bold">{profile.name}</p>
          <small className="text-default-500">{profile.nim}</small>
          <div className="flex justify-between"><h4 className="font-bold text-large">{profile.role}</h4><Link href={profile.github} color="foreground" size="lg"><GithubIcon/></Link></div>
          
        </CardBody>
      </Card>
      ))}
      
    </div>
  );
}
