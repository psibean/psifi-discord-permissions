import classNames from "classnames";
import { ChannelType } from "discord-api-types/v10"
import { CgHashtag, CgLock, CgMic, CgVolume } from "react-icons/cg";

export type ChannelIconProps = {
  className?: string;
  type: ChannelType;
  locked: boolean;
}

export default ({ className, locked, type }: ChannelIconProps ) => {
  const parsedClassName = classNames(className && className);
  if (locked) return <CgLock className={parsedClassName} />
  switch (type) {
    case ChannelType.GuildStageVoice:
      return <CgVolume className={parsedClassName} />
    case ChannelType.GuildVoice:
      return <CgMic className={parsedClassName} />
    default:
      return <CgHashtag className={parsedClassName} />
  }
}