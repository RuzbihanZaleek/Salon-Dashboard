const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const sendAdminEmail = async (values) => {
  console.log(values['email']);
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  })

  //Create token
  const token = jwt.sign(
    { email: values['email'] },
    process.env.TOKEN_KEY,
    {
      expiresIn: 7200 //2 hours
    }
  );


  let details = {
    from: "ruzbihaneyepax@gmail.com",
    to: values['email'],
    subject: "Join as Salon Prauge Admin",
    text: "Welcome to Salon Prauge Admin Panel",
    html: `<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

    <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <style>
            * {
                box-sizing: border-box;
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }
    
            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }
    
            p {
                line-height: inherit
            }
    
            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }
    
            @media (max-width:845px) {
    
                .desktop_hide table.icons-inner,
                .social_block.desktop_hide .social-table {
                    display: inline-block !important;
                }
    
                .icons-inner {
                    text-align: center;
                }
    
                .icons-inner td {
                    margin: 0 auto;
                }
    
                .image_block img.big,
                .row-content {
                    width: 100% !important;
                }
    
                .mobile_hide {
                    display: none;
                }
    
                .stack .column {
                    width: 100%;
                    display: block;
                }
    
                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }
    
                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }
    
                .reverse {
                    display: table;
                    width: 100%;
                }
    
                .reverse .column.first {
                    display: table-footer-group !important;
                }
    
                .reverse .column.last {
                    display: table-header-group !important;
                }
    
                .row-6 td.column.first>table,
                .row-6 td.column.last>table {
                    padding-left: 0;
                    padding-right: 0;
                }
    
                .row-6 td.column.first .border,
                .row-6 td.column.last .border {
                    border-top: 0;
                    border-right: 0px;
                    border-bottom: 0;
                    border-left: 0;
                }
            }
        </style>
    </head>
    
    <body style="background-color: #e1cfc3; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e1cfc3;" width="100%">
            <tbody>
                <tr>
                    <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;padding-bottom:15px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img
                                                                            alt="cosmetics-products" class="big"
                                                                            src="https://images.pexels.com/photos/3331486/pexels-photo-3331486.jpeg?cs=srgb&dl=pexels-engin-akyurt-3331486.jpg&fm=jpg&_gl=1*13csrjh*_ga*MTc5MTg1NDgyMi4xNjY1NTY5OTc3*_ga_8JE65Q40S6*MTY2NjI1NTQ2NC4yLjEuMTY2NjI1Njk2MC4wLjAuMA.."
                                                                            style="display: block; height: auto; border: 0; width: 660px; max-width: 100%;"
                                                                            title="cosmetics-products" width="660" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-left:10px;padding-right:10px;padding-top:30px;">
                                                                    <div
                                                                        style="font-family: Georgia, 'Times New Roman', serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 14.399999999999999px; color: #292f37; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; text-align: center; mso-line-height-alt: 14.399999999999999px; letter-spacing: 5px;">
                                                                                <strong><span
                                                                                        style="font-size:34px;">Welcome to
                                                                                        Salon Prauge!
                                                                                    </span></strong>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-5" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
                                                                    <div style="font-family: Arial, sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                                                            <p
                                                                                style="margin: 0; font-size: 18px; text-align: center; mso-line-height-alt: 18px;">
                                                                                <a
                                                                                    href="http://localhost:3000/register?key=${token}">
                                                                                    Click here to register.</a>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-7" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad" style="padding-top:10px;">
                                                                    <div
                                                                        style="font-family: Georgia, 'Times New Roman', serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 18px; color: #292f37; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; text-align: center; mso-line-height-alt: 30px;">
                                                                                <a><img src="https://res.cloudinary.com/dkbk51c9j/image/upload/v1666175300/logo_black_copydsd_d3azq9.png"
                                                                                        style="width: 100%; height: 100px; object-fit: contain" /></a>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="divider_block block-8" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:5px;padding-left:5px;padding-right:5px;padding-top:15px;">
                                                                    <div align="center" class="alignment">
                                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                                            role="presentation"
                                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                            width="30%">
                                                                            <tr>
                                                                                <td class="divider_inner"
                                                                                    style="font-size: 1px; line-height: 1px; border-top: 1px solid #292F37;">
                                                                                    <span> </span>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-9" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="font-family: Arial, sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #90572e; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; text-align: center; mso-line-height-alt: 18px; letter-spacing: 4px;">
                                                                                <strong><span style="font-size:20px;">For
                                                                                        further information contact
                                                                                        us</span></strong>
                                                                            </p>
                                                                            <p
                                                                                style="margin: 0; text-align: center; mso-line-height-alt: 30px; letter-spacing: 4px;">
                                                                                <strong><span style="font-size:20px;">(487)
                                                                                        1070 1087</span></strong>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="divider_block block-10" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:40px;padding-left:5px;padding-right:5px;padding-top:5px;">
                                                                    <div align="center" class="alignment">
                                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                                            role="presentation"
                                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                            width="30%">
                                                                            <tr>
                                                                                <td class="divider_inner"
                                                                                    style="font-size: 1px; line-height: 1px; border-top: 1px solid #292F37;">
                                                                                    <span> </span>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <div class="spacer_block"
                                                            style="height:35px;line-height:35px;font-size:1px;"> </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;padding-bottom:5px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img alt="Product-image-01"
                                                                            class="big"
                                                                            src="https://images.pexels.com/photos/2799609/pexels-photo-2799609.jpeg?cs=srgb&dl=pexels-maria-geller-2799609.jpg&fm=jpg"
                                                                            style="display: block; height: auto; border: 0; width: 386px; max-width: 100%;"
                                                                            title="Product-image-01" width="386" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-2"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:15px;">
                                                                    <div
                                                                        style="font-family: Georgia, 'Times New Roman', serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 14.399999999999999px; color: #292f37; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; mso-line-height-alt: 14.399999999999999px;">
                                                                                <span style="font-size:28px;">Haircut</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;">
                                                                    <div style="font-family: Arial, sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #292f37; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; mso-line-height-alt: 22.5px;">
                                                                                <span style="font-size:15px;">Lorem ipsum
                                                                                    dolor sit amet, consectetur adipiscing
                                                                                    elit. In sed arcu vitae magna aliquet
                                                                                    sodales sit amet maut sem. Lorem ipsum
                                                                                    dolor sit amet, consectetur adipiscing
                                                                                    elit. In sed arcu vitae magna aliquet
                                                                                    sodales sit amet maut sem.</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-4" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:20px;padding-right:10px;padding-top:10px;">
                                                                    <div
                                                                        style="font-family: Georgia, 'Times New Roman', serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 14.399999999999999px; color: #90572e; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; mso-line-height-alt: 14.399999999999999px;">
                                                                                <span style="font-size:22px;"><strong><span
                                                                                            style="">Start from $
                                                                                            25.00</span></strong></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <div class="spacer_block"
                                                            style="height:35px;line-height:35px;font-size:1px;"> </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr class="reverse">
                                                    <td class="column column-1 first"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <div class="border">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="text_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:15px;">
                                                                        <div
                                                                            style="font-family: Georgia, 'Times New Roman', serif">
                                                                            <div class=""
                                                                                style="font-size: 12px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 14.399999999999999px; color: #292f37; line-height: 1.2;">
                                                                                <p
                                                                                    style="margin: 0; mso-line-height-alt: 14.399999999999999px;">
                                                                                    <span style="font-size:28px;">Hair
                                                                                        Styling</span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="text_block block-3" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;">
                                                                        <div style="font-family: Arial, sans-serif">
                                                                            <div class=""
                                                                                style="font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #292f37; line-height: 1.5;">
                                                                                <p
                                                                                    style="margin: 0; mso-line-height-alt: 22.5px;">
                                                                                    <span style="font-size:15px;">Lorem
                                                                                        ipsum dolor sit amet, consectetur
                                                                                        adipiscing elit. In sed arcu vitae
                                                                                        magna aliquet sodales sit amet maut
                                                                                        sem. Lorem ipsum dolor sit amet,
                                                                                        consectetur adipiscing elit. In sed
                                                                                        arcu vitae magna aliquet sodales sit
                                                                                        amet maut sem.</span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="text_block block-4" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:15px;padding-left:20px;padding-right:10px;padding-top:10px;">
                                                                        <div
                                                                            style="font-family: Georgia, 'Times New Roman', serif">
                                                                            <div class=""
                                                                                style="font-size: 12px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 14.399999999999999px; color: #90572e; line-height: 1.2;">
                                                                                <p
                                                                                    style="margin: 0; mso-line-height-alt: 14.399999999999999px;">
                                                                                    <span style="font-size:22px;"><strong><span
                                                                                                style="">Start from $
                                                                                                30.00</span></strong></span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td class="column column-2 last"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <div class="border">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="image_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;padding-bottom:5px;">
                                                                        <div align="center" class="alignment"
                                                                            style="line-height:10px"><img
                                                                                alt="product-image-02" class="big"
                                                                                src="https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?cs=srgb&dl=pexels-engin-akyurt-3065171.jpg&fm=jpg"
                                                                                style="display: block; height: auto; border: 0; width: 386px; max-width: 100%;"
                                                                                title="product-image-02" width="386" />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <div class="spacer_block"
                                                            style="height:35px;line-height:35px;font-size:1px;"> </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;padding-bottom:5px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img alt="Product-image-03"
                                                                            class="big"
                                                                            src="https://images.pexels.com/photos/3973089/pexels-photo-3973089.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3973089.jpg&fm=jpg&_gl=1*zcuulv*_ga*MTc5MTg1NDgyMi4xNjY1NTY5OTc3*_ga_8JE65Q40S6*MTY2NjI1NTQ2NC4yLjEuMTY2NjI1NjY1Ny4wLjAuMA.."
                                                                            style="display: block; height: auto; border: 0; width: 386px; max-width: 100%;"
                                                                            title="Product-image-03" width="386" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-2"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:15px;">
                                                                    <div
                                                                        style="font-family: Georgia, 'Times New Roman', serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 14.399999999999999px; color: #292f37; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; mso-line-height-alt: 14.399999999999999px;">
                                                                                <span style="font-size:28px;">Makeup</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;">
                                                                    <div style="font-family: Arial, sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #292f37; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; mso-line-height-alt: 22.5px;">
                                                                                <span style="font-size:15px;">Lorem ipsum
                                                                                    dolor sit amet, consectetur adipiscing
                                                                                    elit. In sed arcu vitae magna aliquet
                                                                                    sodales sit amet maut sem. Lorem ipsum
                                                                                    dolor sit amet, consectetur adipiscing
                                                                                    elit. In sed arcu vitae magna aliquet
                                                                                    sodales sit amet maut sem.</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-4" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:20px;padding-right:10px;padding-top:10px;">
                                                                    <div
                                                                        style="font-family: Georgia, 'Times New Roman', serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 14.399999999999999px; color: #90572e; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; mso-line-height-alt: 14.399999999999999px;">
                                                                                <span style="font-size:22px;"><strong><span
                                                                                            style="">Start from $
                                                                                            35.00</span></strong></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <div class="spacer_block"
                                                            style="height:30px;line-height:30px;font-size:1px;"> </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-10"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <div class="spacer_block"
                                                            style="height:15px;line-height:15px;font-size:1px;"> </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-11"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="33.333333333333336%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="empty_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-right:0px;padding-bottom:25px;padding-left:0px;padding-top:10px;">
                                                                    <div></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-2"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="33.333333333333336%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-5" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #292f37; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span style="font-size:12px;">George Street
                                                                                    123, New York</span>
                                                                            </p>
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span
                                                                                    style="font-size:12px;">sales.salonprauge@sp.com</span>
                                                                            </p>
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span style="font-size:12px;">(+487) 1070
                                                                                    1087</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-3"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="33.333333333333336%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="empty_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-right:0px;padding-bottom:5px;padding-left:0px;padding-top:5px;">
                                                                    <div></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-12"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #292f37;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 10px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="10" cellspacing="0"
                                                            class="text_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #ffffff; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span style="font-size:12px;">2022 © All
                                                                                    Rights Reserved</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-13"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 825px;"
                                            width="825">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="icons_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                                                    <table cellpadding="0" cellspacing="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td class="alignment"
                                                                                style="vertical-align: middle; text-align: center;">
                                                                                <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                                                                <!--[if !vml]><!-->
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table><!-- End -->
    </body>
    
    </html>`
    // html: `<body>
    //     <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">

    //     <div style="max-width: 700px; background-color: white; margin: 0 auto">

    //       <div style="width: 100%; background-color: #b99a5f; padding: 20px 0  margin: 0 auto">

    //       <a ><img

    //           src="https://res.cloudinary.com/dkbk51c9j/image/upload/v1666175300/logo_black_copydsd_d3azq9.png"

    //           style="width: 100%; height: 100px; object-fit: contain"

    //         /></a>

    //       </div>

    //       <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">

    //         <p style="font-weight: 800; font-size: 1.8rem; padding: 0 0px">

    //           Hi ,

    //         </p>

    //         <P style="width: 100%; gap: 10px; padding: 0px 20px; display: grid;">Please click below link to register </P>

    //         <div style="font-size: .8rem; margin: 0 30px">

    //             <a href="http://localhost:3000/register?key=${token}">Click here to register</a>

    //         </div>

    //         <p style="width: 100%; gap: 10px; padding: 0px 20px; display: grid">Thank you & Stay safe.</p>
    //         <p style="width: 100%; gap: 10px; padding: 0px 20px; display: grid; ">Jim Hopper</p>
    //         <p style="width: 100%; gap: 10px; padding: 0px 20px; display: grid; ">Super Admin</p>
    //         <p style="width: 100%; gap: 10px; padding: 0px 20px; display: grid; ">Salon Prauge</p>
    //       </div>

    //     </div>

    //   </div>
    //         </body>`
  }

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log("Something went wrong", err);
      return false;
    } else {
      console.log("Email sent!");
      return true;
    }
  })
}

module.exports = sendAdminEmail;