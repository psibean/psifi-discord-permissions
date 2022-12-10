import classNames from "classnames";
import { ChannelType } from "discord-api-types/v10"
import { CgHashtag, CgMic, CgVolume } from "react-icons/cg";

export type ChannelIconProps = {
  className?: string;
  type: ChannelType;
}

export default ({ className, type }: ChannelIconProps ) => {
  const parsedClassName = classNames(className && className);
  switch (type) {
    case ChannelType.GuildStageVoice:
      return <CgVolume className={parsedClassName} />
    case ChannelType.GuildVoice:
      return <CgMic className={parsedClassName} />
    default:
      return <CgHashtag className={parsedClassName} />
  }
}