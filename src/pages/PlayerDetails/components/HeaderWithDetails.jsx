import { countries } from "../../../data/countries";
import { cmToFeetAndInches } from "../../../utils/cmToFeetAndInches";
import { Header } from "../../../shared/components/Header";

const HeaderWithDetails = ({ statData, playerData }) => (
  <Header className="container mx-auto pt-12 lg:pt-28 pb-14 lg:pb-16 bg-blue-diagonal bg-cover bg-no-repeat">
    <div className="flex-col-reverse md:flex-row flex justify-between">
      <div className="flex flex-col w-full">
        <h2 className="font-heading text-3xl lg:text-4xl text-slate-50 uppercase mb-1">
          {playerData.player.firstname}
        </h2>
        <h1 className="font-heading text-5xl lg:text-6xl text-outline uppercase mb-12 lg:mb-16">
          {playerData.player.lastname}
        </h1>
        <div className="md:grid md:grid-cols-8">
          <ul className="md:col-span-4">
            <ListItem title="Role">{statData.games.position}</ListItem>
            <ListItemWithImage
              title="Country"
              imgSrc={`https://flagsapi.com/${
                countries[playerData.player.nationality]
              }/flat/64.png`}
              imgAlt={`${playerData.player.nationality} flag`}
            >
              {playerData.player.nationality}
            </ListItemWithImage>
            <ListItemWithImage
              title="Team"
              imgSrc={statData.team.logo}
              imgAlt={`${statData.team.name} logo`}
            >
              {statData.team.name}
            </ListItemWithImage>
          </ul>

          <ul className="col-span-4">
            <ListItem title="Weight">
              {playerData.player.weight ? `${playerData.player.weight}` : "n/a"}
            </ListItem>
            <ListItem title="Height">
              {cmToFeetAndInches(playerData.player.height)}
            </ListItem>
            <ListItem title="Birth">
              {playerData.player.birth.date} ({playerData.player.age} years old)
            </ListItem>
          </ul>
        </div>
      </div>
      <ImageWithLogo playerData={playerData} statData={statData} />
    </div>
  </Header>
);

const ImageWithLogo = ({ playerData, statData }) => (
  <div className="relative mx-auto w-1/2 mb-12 md:mb-0 md:w-1/3 md:h-fit">
    <img
      className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-full"
      src={playerData.player.photo}
      alt={`${playerData.player.firstname} ${playerData.player.lastname}`}
    />
    <img
      className="absolute max-w-[25%] top-3/4 left-[-5%] shadow-2xl" // adjusts based on container size
      src={statData.team.logo}
      alt={`${statData.team.name} logo`}
    />
  </div>
);

const ListItem = ({ title, children }) => (
  <li className="flex justify-between md:justify-normal md:flex-col mb-6 last:mb-0">
    <span className="text-sm lg:text-base font-medium text-slate-400 uppercase mb-2">
      {title}
    </span>
    <p className="text-sm lg:text-base font-medium uppercase text-slate-50 py-0.5">
      {children}
    </p>
  </li>
);

const ListItemWithImage = ({ title, imgSrc, imgAlt, children }) => (
  <li className="flex justify-between md:justify-normal md:flex-col mb-6 md:last:mb-0">
    <span className="text-sm lg:text-base font-medium text-slate-400 uppercase mb-2">
      {title}
    </span>
    <div className="flex items-center">
      <img className="w-6 h-6 mr-2" src={imgSrc} alt={imgAlt} />
      <p className="text-sm lg:text-base uppercase font-medium text-slate-50">
        {children}
      </p>
    </div>
  </li>
);

export { HeaderWithDetails };
