export default () => {
  return (<>
    <h3>Permission Simulator Help</h3>
    <p>
      Select a channel to view the permissions available on the channel based on the roles you've selected on the left hand side. The permissions you see here are the permissions a user would have given the selected roles, it is all calculated based on your servers base permissions and channel specific overrides.
    </p>
    <p>
      <b>If a channel is not listed, the bot does not have permission to view it.</b>
      <p>If any of the roles you have selected has the Administrator permission, then all permissions will be available.</p>
    </p>
  </>)
}