import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useGuilds } from "../../state/user.slice";
import SelectGuildCard from "../../components/dashboard/GuildCard/SelectGuildCard";
import {
    AUTHORIZE_URL,
    GUILD_REDIRECT_URI,
    PSD_CLIENT_ID,
} from "../../util/constants";
import InviteGuildCard from "../../components/dashboard/GuildCard/InviteGuildCard";
import { useNavigate } from "react-router-dom";
import BasePage from "../BasePage";
// import { TbRefreshDot } from 'react-icons/tb';

export default () => {
    const navigate = useNavigate();
    const guilds = useGuilds();
    const [popupWindow, setPopupWindow] = useState(null as Window | null);
    const [selectedGuild, setSelectedGuild] = useState(null as null | string);

    useEffect(() => {
        // Add event handler to window on mount
        const handlePopupMessage = (event: MessageEvent) => {
            // Compare origin to prevent XSS
            if (event.origin === window.location.origin) {
                setSelectedGuild(event.data.guildId ?? null);
            }
        };

        window?.addEventListener("message", handlePopupMessage);
        // Remove the handler on unmount
        return () => {
            window.removeEventListener("message", handlePopupMessage);
        };
    }, []);

    const handleInviteClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            // Build the guild invite URL based on the clicked guild.
            // reponse_type of code allows the redirect_uri to work
            const guildInviteUrl = new URL(AUTHORIZE_URL);
            guildInviteUrl.searchParams.set("scope", "bot");
            guildInviteUrl.searchParams.set("response_type", "code");
            guildInviteUrl.searchParams.set("redirect_uri", GUILD_REDIRECT_URI);
            guildInviteUrl.searchParams.set("permissions", "0");
            guildInviteUrl.searchParams.set("client_id", PSD_CLIENT_ID);
            guildInviteUrl.searchParams.set(
                "guild_id",
                event.currentTarget.dataset.guild_id as string
            );

            if (popupWindow === null || popupWindow.closed) {
                const newPopupWindow = window.open(
                    guildInviteUrl,
                    "Invite Psifi",
                    "width=500,height=850"
                );
                setPopupWindow(newPopupWindow);
                newPopupWindow?.focus();
            } else {
                popupWindow.location.href = guildInviteUrl.toString();
                popupWindow?.focus();
            }
        },
        [popupWindow]
    );

    if (selectedGuild !== null) {
        navigate(`/dashboard/guilds/${selectedGuild}`);
    }

    return (
        <BasePage title="Select a server">
           { guilds.length === 0 ? <div className="mt-4 text-center">
            <h3 className="text-2xl font-medium">Whoops! It doesn't look like there's any servers here!</h3>
            <p className="text-xl">You will need to own or administrate a server to see it here.</p>
            <p>For now, refreshing the page will only update for guilds the bot is in.</p>
            <p>To update this page with guilds that you now own or administrate, please logout and log back in.</p>
            <p>For now, this is for simpler and more secure handling of the login process.</p>
            {/* <div className="flex flex-col items-center align-center hover:cursor-pointer">
                <TbRefreshDot className="h-16 w-16" />
                <span className="block">Refresh</span>
            </div> */}
           </div> :
            <div className="flex flex-row flex-wrap justify-center mx-auto">
                {guilds &&
                    guilds
                        .filter((guild) => guild.access)
                        .map((guild) => (
                            <SelectGuildCard key={guild.id} guild={guild} />
                        ))}
                {guilds &&
                    guilds
                        .filter((guild) => !guild.access)
                        .map((guild) => (
                            <InviteGuildCard
                                key={guild.id}
                                guild={guild}
                                inviteHandler={handleInviteClick}
                            />
                        ))}
            </div>}
        </BasePage>
    );
};
