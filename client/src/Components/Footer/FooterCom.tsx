import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { footerIcon, footerLinkGroup } from "./FooterData";
import BrandLink from "../../utils/BrandLink";

function FooterCom() {
  return (
    <Footer className="border border-t-8 border-teal-500 p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div>
            <BrandLink className="text-sm sm:text-xl font-semibold" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 mt-4 sm:mt-3">
            {footerLinkGroup.map((item, index) => (
              <div key={index}>
                <Footer.Title title={item.title} />
                {item.links.map((link, index) => (
                  <Footer.LinkGroup col key={index}>
                    <Footer.Link
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </Footer.Link>
                  </Footer.LinkGroup>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full flex justify-between items-center sm:flex-col mb-8">
          <Footer.Copyright
            href="#"
            year={new Date().getFullYear()}
            by="Alijan's Blog"
          />
          <div className="flex sm:justify-center gap-6  sm:mt-2 ">
            {footerIcon.map((icon, index) => (
              <Footer.Icon
                href={icon.link}
                icon={icon.icon}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterCom;
