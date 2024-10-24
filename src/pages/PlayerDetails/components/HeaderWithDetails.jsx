import { countries } from "../../../data/countries";
import { cmToFeetAndInches } from "../../../utils/cmToFeetAndInches";

const HeaderWithDetails = ({ data }) => (
  <header className="pt-28 pb-14 bg-blue-diagonal bg-contain bg-no-repeat">
    <div className="flex justify-between">
      <div className="flex flex-col w-full">
        <h2 className="font-heading text-4xl text-slate-50 uppercase mb-1">
          {data.player.firstname}
        </h2>
        <h1 className="font-heading text-6xl text-outline uppercase mb-12">
          {data.player.lastname}
        </h1>
        <div className="grid grid-cols-8">
          <ul className="col-span-4">
            <ListItem title="Role">
              {data.statistics[0].games.position}
            </ListItem>
            <ListItemWithImage
              title="Country"
              imgSrc={`https://flagsapi.com/${
                countries[data.player.nationality]
              }/flat/64.png`}
              imgAlt={`${data.player.nationality} flag`}
            >
              {data.player.nationality}
            </ListItemWithImage>
            <ListItemWithImage
              title="Team"
              imgSrc={data.statistics[0].team.logo}
              imgAlt={`${data.statistics[0].team.name} logo`}
            >
              {data.statistics[0].team.name}
            </ListItemWithImage>
          </ul>

          <ul className="col-span-4">
            <ListItem title="Weight">
              {data.player.weight ? `${data.player.weight}` : "n/a"}
            </ListItem>
            <ListItem title="Height">
              {cmToFeetAndInches(data.player.height)}
            </ListItem>
            <ListItem title="Birth">
              {data.player.birth.date} ({data.player.age} years old)
            </ListItem>
          </ul>
        </div>
      </div>
      <ImageWithLogo data={data} />
    </div>
  </header>
);

const ImageWithLogo = ({ data }) => (
  <div className="relative w-1/3">
    <img
      className="w-full rounded-full"
      src={data.player.photo}
      alt={`${data.player.firstname} ${data.player.lastname}`}
    />
    <img
      className="absolute right-60 top-48 w-40 h-40"
      src={data.statistics[0].team.logo}
      alt={`${data.statistics[0].team.name} logo`}
    />
  </div>
);

const ListItem = ({ title, children }) => (
  <li className="mb-4">
    <h3 className="text-s text-slate-500 uppercase mb-2">{title}</h3>
    <p className="text-base uppercase text-slate-50">{children}</p>
  </li>
);

const ListItemWithImage = ({ title, imgSrc, imgAlt, children }) => (
  <li className="mb-4">
    <h3 className="text-s text-slate-500 uppercase mb-2">{title}</h3>
    <div className="flex items-center">
      <img className="w-6 h-6 mr-2" src={imgSrc} alt={imgAlt} />
      <p className="text-base uppercase text-slate-50">{children}</p>
    </div>
  </li>
);

export { HeaderWithDetails };
