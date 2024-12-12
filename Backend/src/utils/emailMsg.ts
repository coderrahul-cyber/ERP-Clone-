 const emailmsg = ({name , userId , password} : {name : string  | undefined, userId : string , password: string}) :string=>{
 return (
    `<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; color: #333;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <header style="text-align: center; margin-bottom: 20px;">
          <img src="https://d.gehu.ac.in/uploads/image/gehu-dehradun.png" alt="Graphic Era Logo" style="max-width: 120px;" />
          <h2 style="color: #d23669; margin-top: 10px;">Welcome to Graphic Era</h2>
        </header>
  
        <p style="font-size: 16px; margin-bottom: 20px;">
          Hello <strong>${name}</strong>,
        </p>
  
        <p style="font-size: 16px; margin-bottom: 20px;">
          Congratulations! You have successfully registered as a student. Below are your login credentials. Please keep them secure:
        </p>
  
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f3f3f3;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f3f3f3;">User ID</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${userId}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f3f3f3;">Password</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${password}</td>
          </tr>
        </table>
  
        <p style="font-size: 16px; margin-bottom: 20px;">
          You can now log in using the above credentials to access your account.
        </p>
  
        <footer style="text-align: center; margin-top: 30px;">
          <p style="font-size: 14px; color: #888;">Best regards,</p>
          <p style="font-size: 14px; font-weight: bold;">Graphic Era</p>
          <p style="font-size: 14px; color: #888;">Contact us at: support@graphicerahilluniversity.com</p>
        </footer>
      </div>
    </body>
  </html>
  `
 )
}

export default emailmsg;
  