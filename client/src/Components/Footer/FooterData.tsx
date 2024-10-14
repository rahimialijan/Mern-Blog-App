import { IconType } from "react-icons";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

interface IFooterData {
  icon: IconType;
  link: string;
}

interface IFooterLink {
  name: string;
  link: string;
}

export interface IFooterLinkGroup {
  title: string;
  links: IFooterLink[];
}

export const footerIcon: IFooterData[] = [
  {
    icon: BsFacebook,
    link: "https://www.facebook.com/alijanrahimi",
  },
  {
    icon: BsTwitter,
    link: "https://twitter.com/alijanrahimi",
  },
  {
    icon: BsInstagram,
    link: "https://www.instagram.com/alijanrahimi/",
  },
  {
    icon: BsLinkedin,
    link: "https://www.linkedin.com/in/alijan-rahimi-18389ab3/",
  },
  {
    icon: BsGithub,
    link: "https://github.com/alijanrahimi",
  },
];

export const footerLinkGroup: IFooterLinkGroup[] = [
  {
    title: "About",
    links: [
      {
        name: "Portfolio",
        link: "https://alijanrahimi.netlify.app/",
      },
      {
        name: "LinkedIn",
        link: "https://github.com/rahimialijan",
      },
    ],
  },
  {
    title: "Follow Me",
    links: [
      {
        name: "Twitter",
        link: "https://x.com/AlijanRahimi10",
      },
      {
        name: "GitHub",
        link: "https://github.com/rahimialijan",
      },
    ],
  },
  {
    title: "Legal",
    links:[
      {
        name: "Provicy Policy",
        link: "#"
      },
      {
        name: "Terms & Conditions",
        link:"#"
      }
    ]
  }
];
