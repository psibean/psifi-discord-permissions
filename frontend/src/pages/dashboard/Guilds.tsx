import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useListedGuilds } from "../../state/user.slice";
import SelectGuildCard from "../../components/dashboard/GuildCard/SelectGuildCard";
import {
    AUTHORIZE_URL,
    CLIENT_ROUTES,
    GUILD_REDIRECT_URI,
    PSD_CLIENT_ID,
} from "../../util/constants";
import { useNavigate } from "react-router-dom";
import BasePage from "../BasePage";
import Paragraph from "../../components/common/Paragraph";
import HeaderTwo from "../../components/common/HeaderTwo";
import { fetchGuilds } from "../../util/api";
import { useDispatch } from "react-redux";
import RequestError from "../../util/RequestError";
import Loading from "../../components/util/Loading";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { selectGuild, useSelectedGuild } from "../../state/selectedGuild.slice";
import { SelectedGuildChannels, SelectedGuildRoles } from "../../../../psd-types/src/types";
// import { TbRefreshDot } from 'react-icons/tb';

export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedGuild = useSelectedGuild();
    const guilds = useListedGuilds();
    const [popupWindow, setPopupWindow] = useState(null as Window | null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // Add event handler to window on mount
        const handlePopupMessage = (event: MessageEvent) => {
            // Compare origin to prevent XSS
            if (event.origin === window.location.origin) {
                const guildId = event.data.guildId as string | undefined | null;
                if (guildId) {
                    // setSelectedGuild(event.data.guildId ?? null);
                    navigate(`/dashboard/guilds/${guildId}`);
                }
            }
        };

        window?.addEventListener("message", handlePopupMessage);

        fetchGuilds(dispatch).then((guilds) => {
            if (selectedGuild && selectedGuild.guild) { 
                const selectedGuildInListed = guilds.find(guild => guild.id === selectedGuild?.guild?.id);
                if (!selectedGuildInListed) {
                    selectGuild({
                        guild: null,
                        roles: {} as SelectedGuildRoles,
                        channels: {} as SelectedGuildChannels
                    });
                }
            }
            
            setLoading(false);
        }).catch(error => {
            if (error instanceof RequestError) {
                if (error.code === 401 || error.code === 403) {
                    navigate(CLIENT_ROUTES.ROOT);
                }
            }
            throw error;
        })

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
            guildInviteUrl.searchParams.set("permissions", PermissionFlagsBits.Administrator.toString());
            guildInviteUrl.searchParams.set("client_id", PSD_CLIENT_ID);

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

    if (isLoading) {
        return <Loading text="Loading servers..." />
    }

    return (
        <BasePage title="Select a server">
            <button
                className="px-4 py-2 font-semibold text-lg bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-sm"
                onClick={handleInviteClick}>
                    Invite Psifi Bot
            </button>
           { guilds.length === 0 ? <div className="text-center">
            <HeaderTwo>Whoops! It doesn't look like there's any servers here!</HeaderTwo>
            <Paragraph>You will need to invite the bot to a server you own or administrate to see it here.</Paragraph>
           </div> :
            <div className="flex flex-row flex-wrap justify-center mx-auto">
                {guilds &&
                    guilds
                        .map((guild) => (
                            <SelectGuildCard key={guild.id} guild={guild} />
                        ))}
            </div>}
        </BasePage>
    );
};
