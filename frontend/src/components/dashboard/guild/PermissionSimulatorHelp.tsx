import Anchor from "../../common/Anchor";
import HeaderTwo from "../../common/HeaderTwo";
import ListItem from "../../common/ListItem";
import Paragraph from "../../common/Paragraph";
import UnorderedList from "../../common/UnorderedList";
import {
    BaseSimulatorPageBody,
    BaseSimulatorPageContainer,
    BaseSimulatorPageHeader,
} from "./BaseSimulatorPage";

export default () => {
    return (
        <BaseSimulatorPageContainer>
            <BaseSimulatorPageHeader>
                Permission Simulator Help
            </BaseSimulatorPageHeader>
            <BaseSimulatorPageBody>
                <div className="max-w-4xl mx-auto">
                    <Paragraph>
                        Select a channel to view the permissions available on
                        the channel based on the roles you have selected on the
                        left hand side. The permissions you see here are the
                        permissions a user would have given the selected roles,
                        it is all calculated based on your servers base
                        permissions, category and channel specific overrides.
                        Calculations are made as per the official{" "}
                        <Anchor href="https://discord.com/developers/docs/topics/permissions#permission-overwrites">
                            Discord documentation pseudocode
                        </Anchor>
                        .
                    </Paragraph>
                    <Paragraph>
                        Please note there are other things which may impact what
                        a user can or cannot do. For example, if a user A and
                        user B both have the Administrator permission, they are
                        still unable to take certain actions against the server
                        owner, such as mute and kick. They will also be unable
                        to take certain actions against other administrator's
                        whose highest ranking role is higher than their own in
                        the role hierarchy.
                    </Paragraph>
                    <HeaderTwo>Guide</HeaderTwo>
                    <UnorderedList>
                        <ListItem>
                            If you update your channel permissions or role 
                            permissions, just refresh!
                        </ListItem>
                        <ListItem>
                            If a channel is not listed, the bot does not have
                            permission to view it and cannot show you
                            permissions for it.
                        </ListItem>
                        <ListItem>
                            If a role provides the Administrator permission,
                            then a user will have ALL permissions.
                        </ListItem>
                        <ListItem>
                            If a channel is crossed out and cannot be clicked,
                            it means that channel cannot be viewed based on the
                            current roles, and thus, no other permissions
                            matter.
                        </ListItem>
                        <ListItem>
                            If a voice channel has the lock icon instead of a
                            microphone, it means that channel is visible, but
                            you do not have the Connect permission based on the
                            current roles.
                        </ListItem>
                    </UnorderedList>
                </div>
            </BaseSimulatorPageBody>
        </BaseSimulatorPageContainer>
    );
};
