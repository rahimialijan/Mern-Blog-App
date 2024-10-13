import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

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
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://alijanrahimi.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/rahimialijan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Me" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/rahimialijan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link
                  href="https://x.com/AlijanRahimi10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Provicy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
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
            <Footer.Icon
              href="https://github.com/rahimialijan"
              icon={BsGithub}
            />
            <Footer.Icon
              href="https://www.facebook.com/alijanrahimi24"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://www.linkedin.com/in/alijan-rahimi-18389ab3/"
              icon={BsLinkedin}
            />
            <Footer.Icon
              href="https://www.instagram.com/alijanrahimi24/"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="https://twitter.com/AlijanRahimi10"
              icon={BsTwitter}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterCom;
