export const ImageWithLogo = ({ data }) => (
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
