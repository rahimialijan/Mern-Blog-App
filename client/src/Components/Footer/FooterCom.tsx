import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { footerIcon, footerLinkGroup } from "./FooterData";

function FooterCom() {
  return (
    <Footer className="border border-t-8 border-teal-500 p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div>
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Sahand's
              </span>
              Blogs
            </Link>
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
