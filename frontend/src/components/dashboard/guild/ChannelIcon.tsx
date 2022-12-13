import classNames from "classnames";
import { ChannelType } from "discord-api-types/v10"
import { CgHashtag, CgLock, CgMic, CgVolume } from "react-icons/cg";

export type ChannelIconProps = {
  className?: string;
  type: ChannelType;
  locked?: boolean;
}

export default ({ className, locked, type }: ChannelIconProps ) => {
  const parsedClassName = classNames(className && className);
  if (locked) return <CgLock title={`Locked ${type === ChannelType.GuildVoice ? 'Voice Channel' : "Stage Channel"} CHannel`} className={parsedClassName} />
  switch (type) {
    case ChannelType.GuildStageVoice:
      return <CgVolume title="Stage Channel" className={parsedClassName} />
    case ChannelType.GuildVoice:
      return <CgMic title="Voice Channel" className={parsedClassName} />
    default:
      return <CgHashtag title="Text Channel" className={parsedClassName} />
  }
}