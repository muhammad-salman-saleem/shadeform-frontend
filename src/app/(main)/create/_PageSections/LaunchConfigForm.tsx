const LaunchConfigForm = ({ instance_config }) => {
  console.log(instance_config);

  //call create instance api after launch config submit
  return (
    <div>
      <div>GPU Info</div>
      {/*gpu info from props, non editable*/}

      <div>Basic Settings</div>
      <div>Name</div>
      <div>Region</div>
      <div>Shadecloud</div>

      <div>Launch Config</div>
      <div>VM or Conatiner</div>
      <div> Display os options from props</div>

      <div>Connection Access</div>
      <div></div>
    </div>
  );
};

export default LaunchConfigForm;
