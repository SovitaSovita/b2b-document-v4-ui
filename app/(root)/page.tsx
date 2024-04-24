'use client'

import { useSession } from "next-auth/react";
import SideContent from "../components/SideContent";
import SideBar from "../components/SideBar";

export default function Home() {

  const menudata = {
    "ARTICLES": [
      {
        "id": 294,
        "tag_id": 203,
        "title": "ABA",
        "isfavorite": "0"
      },
      {
        "id": 358,
        "tag_id": 262,
        "title": "Ai Genreate",
        "isfavorite": "0"
      },
      {
        "id": 195,
        "tag_id": 103,
        "title": "Ajax before/after",
        "isfavorite": "0"
      },
      {
        "id": 362,
        "tag_id": 166,
        "title": "API management",
        "isfavorite": "0"
      },
      {
        "id": 306,
        "tag_id": 107,
        "title": "Banknote",
        "isfavorite": "0"
      },
      {
        "id": 238,
        "tag_id": 250,
        "title": "Banknoted",
        "isfavorite": "0"
      },
      {
        "id": 222,
        "tag_id": 103,
        "title": "Bb File Upload",
        "isfavorite": "0"
      },
      {
        "id": 223,
        "tag_id": 203,
        "title": "Beyond Compare setting",
        "isfavorite": "0"
      },
      {
        "id": 70,
        "tag_id": 104,
        "title": "Blocking Table",
        "isfavorite": "0"
      },
      {
        "id": 268,
        "tag_id": 95,
        "title": "check error log",
        "isfavorite": "0"
      },
      {
        "id": 284,
        "tag_id": 236,
        "title": "Checkout SVN",
        "isfavorite": "0"
      },
      {
        "id": 250,
        "tag_id": 201,
        "title": "Check send data",
        "isfavorite": "0"
      },
      {
        "id": 239,
        "tag_id": 109,
        "title": "Class file",
        "isfavorite": "0"
      },
      {
        "id": 229,
        "tag_id": 95,
        "title": "Cloud&PPP Structure",
        "isfavorite": "0"
      },
      {
        "id": 134,
        "tag_id": 95,
        "title": "Comman",
        "isfavorite": "0"
      },
      {
        "id": 281,
        "tag_id": 110,
        "title": "command",
        "isfavorite": "0"
      },
      {
        "id": 299,
        "tag_id": 201,
        "title": "concur admin",
        "isfavorite": "0"
      },
      {
        "id": 267,
        "tag_id": 95,
        "title": "Config UAT Server",
        "isfavorite": "0"
      },
      {
        "id": 243,
        "tag_id": 121,
        "title": "configuration in server",
        "isfavorite": "0"
      },
      {
        "id": 307,
        "tag_id": 107,
        "title": "Content Batch",
        "isfavorite": "0"
      },
      {
        "id": 310,
        "tag_id": 166,
        "title": "dbsafer",
        "isfavorite": "0"
      },
      {
        "id": 273,
        "tag_id": 232,
        "title": "DB table log",
        "isfavorite": "0"
      },
      {
        "id": 63,
        "tag_id": 95,
        "title": "Debug/Error level log",
        "isfavorite": "0"
      },
      {
        "id": 62,
        "tag_id": 109,
        "title": "Deploy Method",
        "isfavorite": "0"
      },
      {
        "id": 244,
        "tag_id": 232,
        "title": "empl-client",
        "isfavorite": "0"
      },
      {
        "id": 363,
        "tag_id": 266,
        "title": "Employee",
        "isfavorite": "0"
      },
      {
        "id": 232,
        "tag_id": 232,
        "title": "Employee URL Test",
        "isfavorite": "0"
      },
      {
        "id": 324,
        "tag_id": 249,
        "title": "Flow",
        "isfavorite": "0"
      },
      {
        "id": 132,
        "tag_id": 95,
        "title": "FSTP",
        "isfavorite": "0"
      },
      {
        "id": 133,
        "tag_id": 110,
        "title": "Gradle for jex",
        "isfavorite": "1"
      },
      {
        "id": 277,
        "tag_id": 110,
        "title": "gradle.prop update version",
        "isfavorite": "0"
      },
      {
        "id": 320,
        "tag_id": 110,
        "title": "grgtegteg",
        "isfavorite": "0"
      },
      {
        "id": 321,
        "tag_id": 103,
        "title": "Hello",
        "isfavorite": "0"
      },
      {
        "id": 231,
        "tag_id": 166,
        "title": "host",
        "isfavorite": "0"
      },
      {
        "id": 233,
        "tag_id": 95,
        "title": "how set alias",
        "isfavorite": "0"
      },
      {
        "id": 69,
        "tag_id": 232,
        "title": "How to add channel",
        "isfavorite": "0"
      },
      {
        "id": 256,
        "tag_id": 104,
        "title": "How to Backup and restore postgressql",
        "isfavorite": "0"
      },
      {
        "id": 322,
        "tag_id": 104,
        "title": "How to create database and user",
        "isfavorite": "0"
      },
      {
        "id": 247,
        "tag_id": 121,
        "title": "How to install OZ Report",
        "isfavorite": "0"
      },
      {
        "id": 270,
        "tag_id": 201,
        "title": "How to test card-mis coocon logs",
        "isfavorite": "0"
      },
      {
        "id": 234,
        "tag_id": 95,
        "title": "Illegal key size",
        "isfavorite": "0"
      },
      {
        "id": 283,
        "tag_id": 236,
        "title": "Import Project",
        "isfavorite": "0"
      },
      {
        "id": 248,
        "tag_id": 166,
        "title": "info",
        "isfavorite": "0"
      },
      {
        "id": 282,
        "tag_id": 236,
        "title": "Installation",
        "isfavorite": "0"
      },
      {
        "id": 330,
        "tag_id": 203,
        "title": "Jex2 convert to Jex3",
        "isfavorite": "0"
      },
      {
        "id": 252,
        "tag_id": 109,
        "title": "jex3.0 (how to request deploy on jexStudio)",
        "isfavorite": "0"
      },
      {
        "id": 271,
        "tag_id": 103,
        "title": "jex3 how to deploye",
        "isfavorite": "0"
      },
      {
        "id": 71,
        "tag_id": 103,
        "title": "jexDeploy info",
        "isfavorite": "0"
      },
      {
        "id": 66,
        "tag_id": 103,
        "title": "JexSystem/System Prop",
        "isfavorite": "0"
      },
      {
        "id": 198,
        "tag_id": 99,
        "title": "JS module",
        "isfavorite": "0"
      },
      {
        "id": 251,
        "tag_id": 166,
        "title": "List Project",
        "isfavorite": "0"
      },
      {
        "id": 68,
        "tag_id": 109,
        "title": "make history",
        "isfavorite": "0"
      },
      {
        "id": 304,
        "tag_id": 107,
        "title": "Monitoring",
        "isfavorite": "0"
      },
      {
        "id": 65,
        "tag_id": 103,
        "title": "Monitoring Jex Deploy",
        "isfavorite": "0"
      },
      {
        "id": 361,
        "tag_id": 263,
        "title": "My testing",
        "isfavorite": "0"
      },
      {
        "id": 272,
        "tag_id": 232,
        "title": "new channel",
        "isfavorite": "0"
      },
      {
        "id": 253,
        "tag_id": 203,
        "title": "Printer",
        "isfavorite": "0"
      },
      {
        "id": 309,
        "tag_id": 250,
        "title": "Saving",
        "isfavorite": "0"
      },
      {
        "id": 328,
        "tag_id": 166,
        "title": "Seat Layout",
        "isfavorite": "0"
      },
      {
        "id": 130,
        "tag_id": 107,
        "title": "Simple batch ",
        "isfavorite": "0"
      },
      {
        "id": 329,
        "tag_id": 255,
        "title": "test title",
        "isfavorite": "0"
      },
      {
        "id": 302,
        "tag_id": 201,
        "title": "UAT",
        "isfavorite": "0"
      },
      {
        "id": 269,
        "tag_id": 99,
        "title": "Use Ajax async:false",
        "isfavorite": "0"
      },
      {
        "id": 323,
        "tag_id": 121,
        "title": "WEHRM",
        "isfavorite": "0"
      }
    ],
    "TAGS": [
      {
        "id": 266,
        "title": "APIMS",
        "dep_id": "1"
      },
      {
        "id": 166,
        "title": "B2B information",
        "dep_id": "1"
      },
      {
        "id": 250,
        "title": "B2B Project",
        "dep_id": "1"
      },
      {
        "id": 107,
        "title": "Batch",
        "dep_id": "1"
      },
      {
        "id": 261,
        "title": "Blockchain",
        "dep_id": "1"
      },
      {
        "id": 201,
        "title": "Concur",
        "dep_id": "1"
      },
      {
        "id": 109,
        "title": "Deploy",
        "dep_id": "1"
      },
      {
        "id": 259,
        "title": "Document",
        "dep_id": "1"
      },
      {
        "id": 236,
        "title": "Eclipse",
        "dep_id": "1"
      },
      {
        "id": 232,
        "title": "Employee",
        "dep_id": "1"
      },
      {
        "id": 203,
        "title": "General",
        "dep_id": "1"
      },
      {
        "id": 110,
        "title": "Gradle",
        "dep_id": "1"
      },
      {
        "id": 99,
        "title": "Javascript",
        "dep_id": "1"
      },
      {
        "id": 103,
        "title": "Jex",
        "dep_id": "1"
      },
      {
        "id": 121,
        "title": "OZ report",
        "dep_id": "1"
      },
      {
        "id": 95,
        "title": "Server",
        "dep_id": "1"
      },
      {
        "id": 249,
        "title": "Spring boot",
        "dep_id": "1"
      },
      {
        "id": 104,
        "title": "SQL",
        "dep_id": "1"
      }
    ]
  };


  const { data: session, status } = useSession();

  console.log("user info (github) : ", session)

  return (
    <>
      <div className="bg-white">
        <div className="relative isolate">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1 rotate-[20deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="">
            <div className="drawer lg:drawer-open font-Figtree">
              <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
              <SideContent />
              <SideBar ARTICLES={menudata.ARTICLES} TAGS={menudata.TAGS} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
