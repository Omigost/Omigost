require('formdata-polyfill');

import 'css/grommet.scss';
import Loader from 'css/Loader.js'

import React from 'react'
import ReactDOM from 'react-dom'

import AppRoot from 'components/AppRoot/AppRoot.jsx'
import contentJsonText from 'content/content.json';

function preloadContent() {
    window.preloadedContent = null;
   
    let data = contentJsonText || {};
    
    //{"about":"PL in ML is a conference whose main purpose is to foster a growing knowledge of great achievements of Poles in machine learning.\nWe believe that it can inspire people to develop their own career path. Apart from that,\nour mission is to bring together a community of people who are interested in the field.","registration":{"enabled":false},"loginDescription":"### Here you can log into your account.\nBy logging you will get access to apply for the Early Bird Registration.\n\n[Here](\/#registration) you can read more about the registration.\n\n#### The Early Birds Registration deadline: **October 20, 2018**.","registerDescription":"### Create a PL in ML account\nAfter creating an account you will get access to the application form.\n\n[Here](\/#registration) you can read more about the registration.\n\n#### The Early Birds Registration deadline: **October 20, 2018**.","forgotPasswordDescription":"### Here you can reset your password\nPlease enter the email address to send the password reset link.\nIf you don't remember your email address or the email did not arrived please contact [our support team](mailto:contact.plinml@mimuw.edu.pl).\n  ","resetPasswordDescription":"### Please provide a new password for the system\nWith a new password you will be able to login into the service.\nPlease save the password somewhere, because then it's hard to be retrieved again.","userPaneDescription":"### Your active forms\nOn this page you can find the form to apply for the conference.\n\n[Here](\/#registration) you can read more about the registration.","date":{"title":"PL in ML","subtitle":"Polish View on Machine Learning","text":"Warsaw, 14 - 17.12.2018","value":"2018-12-14"},"langs":{"hidden":true,"list":["pl","en"]},"location":{"coords":{"lat":52.212271,"lng":20.9823617},"hints":{"bus":[167,182,187,188,191,521,523],"tram":[1,7,9,15,25,35],"parking":[],"veturilo":[9550,9551]}},"menu":{"Home":{"page":"\/","scroll":"top"},"Speakers":{"page":"\/","element":"speakers"},"Agenda":{"page":"\/","element":"agenda","disabled":true},"Registration":{"page":"\/","element":"registration"},"Workshops":{"page":"\/","element":"workshops"},"Sponsors":{"page":"\/","element":"sponsors"},"Organizers":{"page":"\/","element":"organizers"},"Location":{"page":"\/","element":"location"},"Contact":{"page":"\/","element":"contact"},"Registration1":{"page":"\/register","disabled":true},"17' Edition":{"url":"\/archive\/2017"}},"agenda_points":[{"title":"December 14","description":"First day of the conference.","detailedDescription":"The conference is divided between three days of awesome lectures and two tracks. Feel free to select most interesting track and lectures.","x":0,"y":0,"flagX":23,"flagY":-12,"dayIndex":0},{"title":"December 15","description":"Second day of the conference.","detailedDescription":"You can try different tracks prepared specially for audience with varying level of knowledge.","x":370,"y":100,"flagX":28,"flagY":-14,"dayIndex":1},{"title":"December 16","description":"Last day of the conference.","detailedDescription":"Can't wait to see you :)","x":390,"y":250,"flagX":17,"flagY":-14.5,"dayIndex":2},{"x":450,"y":300},{"x":300,"y":370},{"x":450,"y":420},{"x":10000,"y":490}],"agenda":{"disabled":true,"announce":"Coming soon...","days":[{"day":"December 15","tracks":[{"name":"Track1","events":[{"from":"16:00","to":"16:15","type":"INAUGURATION"},{"from":"16:15","to":"17:45","speaker":"Krzysztof Geras","speakerTitle":"New York University","title":"Advances in breast cancer screening with deep neural networks"},{"from":"17:45","to":"18:00","type":"BREAK"},{"from":"18:00","to":"19:00","speaker":"\u0141ukasz Bolikowski","speakerTitle":"BCG Gamma","title":"How to Optimize Market Strategy using Game Theory and How to Recognize Vehicle Types using Deep Learning"},{"from":"20:00","to":"20:30","speaker":"Tymon Ciuk","speakerTitle":"veryknowncorp.co","title":"Using Deep Learning to skilfully undress any wife"},{"from":"20:40","to":"20:70","speaker":"Andreyev Mamkrutiev","speakerTitle":"Very Doctor Of Eveyrthing PhD","title":"How to determine if there is cloud on the photo or there is no colud on the photo or there is a part of the cloud on the photo using reinforced techniques of shallow learing and unnatural language deprocessing"},{"from":"21:00","to":"22:10","speaker":"Kiy Ciw Pupetypie","speakerTitle":"The president of Authisticstan","title":"How to use NLP DL BBQ OMG and WTFITS to determine number of cupcackes that fit the box."},{"from":"23:00","to":"23:01","speaker":"Thomson Thymson","speakerTitle":"I have got no PhD title but I have cookies!","title":"The Fallafelization of Graham and Shmidt and other types of bakery from the kitchen"}]},{"name":"Track2","events":[{"from":"16:00","to":"16:15","type":"INAUGURATION"},{"from":"16:15","to":"17:45","speaker":"Krzysztof Geras","speakerTitle":"New York University","title":"Advances in breast cancer screening with deep neural networks"},{"from":"17:45","to":"18:00","type":"BREAK"},{"from":"18:00","to":"19:00","speaker":"\u0141ukasz Bolikowski","speakerTitle":"BCG Gamma","title":"How to Optimize Market Strategy using Game Theory and How to Recognize Vehicle Types using Deep Learning"},{"from":"19:00","to":"21:37","speaker":"Peter Pan","speakerTitle":"","title":"Using machine learning to count cats! :3 :catface:"},{"from":"22:00","to":"23:00","speaker":"The alien corpse from Area-53","speakerTitle":"The talking corpse of alien","title":"Why the ML leads to collapse of multidimensional space civilisations and why we will invade Earth."}]}]},{"day":"December 16","tracks":[{"name":"Track1","events":[{"from":"17:45","to":"18:00","type":"BREAK"},{"from":"18:00","to":"19:00","speaker":"\u0141ukasz Bolikowski","speakerTitle":"BCG Gamma","title":"How to Optimize Market Strategy using Game Theory and How to Recognize Vehicle Types using Deep Learning"}]},{"name":"Track2","events":[{"from":"19:15","to":"20:45","speaker":"Krzysztof Geras","speakerTitle":"New York University","title":"Advances in breast cancer screening with deep neural networks"}]}]},{"day":"December 17","tracks":[{"name":"Track1","events":[{"from":"20:45","to":"18:00","type":"BREAK"}]},{"name":"Track2","events":[{"from":"20:15","to":"20:45","speaker":"Krzysztof Geras","speakerTitle":"New York University","title":"Advances in breast cancer screening with deep neural networks"}]}]}]},"benefits":{"list":[{"title":"Brilliant talks performed by specialists","icon":"far fa-star","description":"Various background, various opinions"},{"title":"Learn and discover","icon":"fas fa-chalkboard-teacher","description":"Call for Posters, excellent talks and more"},{"title":"All attendants can speak!","icon":"fas fa-volume-up","description":"Get a free entry and share your research during Call for Posters"},{"title":"Meet the community!","icon":"fas fa-users","description":"Get in touch with other machine learning people"}]},"media_partners":{"list":[{"name":"","logo":"img\/media-partners\/PyData.png","url":"https:\/\/pydata.org\/warsaw2018\/"},{"name":"","logo":"img\/media-partners\/CloudForum.png","url":"https:\/\/www.cloudforum.pl\/"},{"name":"","logo":"img\/media-partners\/logo_fund_eng_2.jpg","url":"http:\/\/whyr2018.pl\/"},{"name":"","logo":"img\/media-partners\/data_evangelists.png","url":"http:\/\/dataevangelists.ai"},{"name":"","logo":"img\/media-partners\/mi2_data_lab.jpeg","url":"http:\/\/mi2.mini.pw.edu.pl\/"},{"name":"","logo":"img\/media-partners\/polonium.png","url":"https:\/\/poloniumfoundation.org\/"},{"name":"","logo":"img\/media-partners\/quant_fin.png","url":"https:\/\/www.quantfin.org\/"},{"name":"","logo":"img\/media-partners\/smarter_poland.png","url":"http:\/\/smarterpoland.pl\/"},{"name":"","logo":"img\/media-partners\/opium.png","url":"http:\/\/opium.sh\/"}]},"organizers":{"title":"About us","brief":"We are a group of young Machine Learning enthusiasts who are committed to spreading the knowledge about the discipline.\nEach organizer has background in Mathematics, Informatics or Physics and most of them is closely related to MIMUW faculty.\nOne year ago, we gathered in the faculty to organize a conference that could bring people interested Machine Learning together.","description":"","links":[],"associations":[[{"url":"http:\/\/whyr.pl\/","img":"img\/media-partners\/logo_fund_eng_2.jpg"},{"url":"http:\/\/spolecznosc.mimuw.edu.pl\/","img":"img\/media-partners\/logo-spolecznosc-mimuw-3s2.png"}]],"list":[{"name":"Agnieszka Sitko","role":"Project Leader","avatar":"img\/organizers\/Agnieszka_Sitko.png","url":"https:\/\/www.linkedin.com\/in\/agnieszka-sitko-4b22289b\/"},{"name":"Micha\u0142 Zmys\u0142owski","role":"Vice Project Leader","avatar":"img\/organizers\/Michal_Zmyslowski.png","url":"https:\/\/www.linkedin.com\/in\/micha%C5%82-zmys%C5%82owski-128249162\/"},{"name":"Konrad Czechowski","role":"Scientific Program Coordinator","avatar":"img\/organizers\/Konrad_Czechowski.png","url":"https:\/\/www.linkedin.com\/in\/konrad-czechowski-723bb6150\/"},{"name":"Tomasz W\u0105s","role":"Marketing Coordinator","avatar":"img\/organizers\/Tomasz_Was.png","url":"https:\/\/www.linkedin.com\/in\/tomasz-w%C4%85s\/"},{"name":"Piotr Kozakowski","role":"Workshops Coordinator","avatar":"img\/organizers\/Piotr_Kozakowski.jpg"},{"name":"Aleksandra Mo\u017cejko","role":"Workshops Coordinator","avatar":"img\/organizers\/Aleksandra_Mozejko.png","url":"https:\/\/www.linkedin.com\/in\/aleksandra-mo%C5%BCejko-a953327b\/"},{"name":"Aleksander Bu\u0142a","role":"Sponsorship Coordinator","avatar":"img\/organizers\/Aleksander_Bula.png","url":"https:\/\/www.linkedin.com\/in\/aleksander-bula\/"},{"name":"Piotr Styczy\u0144ski","role":"Web Designer","avatar":"img\/organizers\/Piotr_Styczynski.png","url":"https:\/\/www.linkedin.com\/in\/piotr-styczy%C5%84ski-661043151\/"},{"name":"Magdalena Grodzi\u0144ska","role":"Marketing Officer","avatar":"img\/organizers\/Magdalena_Grodzinska.png","url":"https:\/\/www.linkedin.com\/in\/magdalena-grodzi%C5%84ska-4a47a325\/"},{"name":"Micha\u0142 Filipiuk","role":"Sponsorship Officer","avatar":"img\/organizers\/Michal_Filipiuk.png","url":"https:\/\/www.linkedin.com\/in\/micha%C5%82-filipiuk\/"},{"name":"Jan Sosnowski","role":"Scientific Program Officer","avatar":"img\/organizers\/Jan_Sosnowski.png","url":"https:\/\/www.linkedin.com\/in\/jan-sosnowski-50a804116\/"},{"name":"Mateusz Macias","role":"Scientific Program Officer","avatar":"img\/organizers\/Mateusz_Macias.png","url":"https:\/\/www.linkedin.com\/in\/mateusz-macias-0849a3166\/"},{"name":"Kamil Bladoszewski","role":"Assistant Web Developer","avatar":"img\/organizers\/Kamil_Bladoszewski.png","url":"https:\/\/www.linkedin.com\/in\/kamil-bladoszewski-13632a144\/"},{"name":"Mateusz Masiak","role":"Assistant Web Developer","avatar":"img\/organizers\/Mateusz_Masiak.png","url":"https:\/\/pl.linkedin.com\/in\/mateusz-masiak-2a24bb142"},{"name":"Mateusz Olko","role":"Call-for-Posters Coordinator","avatar":"img\/organizers\/Mateusz_Olko.jpeg"},{"name":"Jan Zy\u015bko","role":"Call-for-Posters Coordinator","avatar":"img\/organizers\/Jan_Zysko.png","url":"https:\/\/www.linkedin.com\/in\/jan-zy%C5%9Bko-0670637\/"},{"name":"Mateusz Kobak","role":"Social Media Officer","avatar":"img\/organizers\/Mateusz_Kobak.png","url":"https:\/\/www.linkedin.com\/in\/mateusz-kobak-a00447144\/"},{"name":"Micha\u0142 Kr\u00f3likowski","role":"Public Relations Officer","avatar":"img\/organizers\/Michal_Krolikowski.png","url":"https:\/\/www.linkedin.com\/in\/m-krolikowski\/"},{"name":"\u0141ukasz Pszenny","role":"Marketing Officer","avatar":"img\/organizers\/Lukasz_Pszenny.png"},{"name":"Jakub J\u00f3zefowicz","role":"Finance Officer","avatar":"img\/organizers\/Jakub_Joz.png"},{"name":"Piotr W\u0119grzyn","role":"Finance Officer","avatar":"img\/organizers\/Piotr_Wegrzyn.png","url":"https:\/\/www.linkedin.com\/in\/piotr-w%C4%99grzyn\/"},{"name":"Bart\u0142omiej Kielak","role":"Finance Officer","avatar":"img\/organizers\/Bartlomiej_Kielak.png"},{"name":"Adam Goli\u0144ski","role":"Program Ambassador","avatar":"img\/organizers\/Adam_Golinski.jpg","url":"https:\/\/www.linkedin.com\/in\/adamgol\/"},{"name":"Marcin Kosi\u0144ski","role":"Program Mentor","avatar":"img\/organizers\/Marcin_Kosinski.png","url":"https:\/\/www.linkedin.com\/in\/marcin-kosi%C5%84ski-81435aab\/"},{"name":"Krzysztof Smutek","role":"Program Mentor","avatar":"img\/organizers\/Krzysztof_Smutek.png","url":"https:\/\/www.linkedin.com\/in\/krzysztof-s-826ba469\/"},{"name":"Agnieszka Strza\u0142ka","role":"Panel Coordinator","avatar":"img\/organizers\/Agnieszka_Strzalka.jpg","url":"https:\/\/www.linkedin.com\/in\/agnieszka-diana-strza%C5%82ka-6b2104125\/"}]},"speakers":{"disabled":false,"hidden":false,"announceText":"To be announced soon!","list":[{"image":"img\/speakers\/PMirowski.jpeg","description":"Piotr Mirowski is a Senior Research Scientist working in the Deep Learning department at DeepMind, focusing on navigation-related research and in scaling up agents to real world environments. Piotr studied computer science in France (ENSEEIHT, Toulouse) and obtained his PhD in computer science in 2011 at New York University, with a thesis on \u201cTime Series Modeling with Hidden Variables and Gradient-based Algorithms\u201d supervised by Prof. Yann LeCun (Outstanding Dissertation Award, 2011). Prior to joining DeepMind, Piotr worked at Schlumberger Research, at the NYU Comprehensive Epilepsy Center, at Bell Labs and at Microsoft Bing, on problems including geostatistics, geological image processing, epileptic seizure prediction from EEG, WiFi-based geolocalisation, robotics, NLP and search query auto-completion. In his spare time, Piotr performs theatre and improv, with or without robots on the stage, and investigates the use of AI for artistic human and machine-based co-creation."},{"image":"img\/speakers\/PBojanowski.jpg","description":"Piotr Bojanowski is a research scientist at Facebook AI Research, working on machine learning applied to computer vision and natural language processing. His main research interest revolve aground large scale unsupervised learning. Before joining Facebook, in 2016, he got a PhD in Computer Science at the Willow team (INRIA Paris) under the supervision of Jean Ponce, Cordelia Schmid, Ivan Laptev and Josef Sivic. He graduated from Ecole polytechnique in 2013 and received a Masters Degree in Mathematics, Machine Learning and Computer Vision (MVA)."},{"image":"img\/speakers\/WCzarnecki.png","description":"Wojciech Czarnecki is a Jagiellonian University graduate, holding a Phd degree from Faculty of Mathematics and Computer Science, awarded for work in the intersection of information theory and machine learning, done under supervision of prof. Jacek Tabor. While in Cracow, he became one of the initial members of [GMUM](http:\/\/gmum.net) (Special Interest Group on Machine Learning, located in Cracow, Lesser Poland), lead by prof. Jacek Tabor and dr hab. Igor Podolak. Currently, he holds a position of Senior Research Scientist at DeepMind, London AI company, best known for their achievements in the field of Deep Reinforcement Learning such as [Deep Q-Networks](https:\/\/deepmind.com\/research\/dqn\/) and [AlphaGo](https:\/\/deepmind.com\/research\/alphago\/). His current research focuses on Multi-agent Deep Reinforcement Learning (MADRL), with most notable recent work on [Capture the Flag project](https:\/\/deepmind.com\/blog\/capture-the-flag) co-lead with Max Jaderberg and Iain Dunning."},{"image":"img\/speakers\/MMalinowski.jpg","description":"Mateusz Malinowski is a Research Scientist at DeepMind. His work concerns Computer Vision and Natural Language Understanding, all 'spiced up' with Deep Learning. He has contributed towards various areas of Computer Vision, namely: Representation Learning, Image Recognition, and Image-to-Text Retrieval. His main contribution is, however, creating foundations and first methods that answer questions about images (Visual Question Answering). This work has gained a wide recognition in the research community. Mateusz has received PhD (summa cum laude) from Max Planck Institute for Informatics, and Saarland University, and received multiple rewards: Dr.-Eduard-Martin Dissertation for the outstanding PhD candidate at Saarland University, and DAGM MVTec for the outstanding dissertation in Machine Learning, Computer Vision, and Pattern Recognition in Germany \/ Austria \/ Switzerland."},{"image":"img\/speakers\/MKowalski.png","description":"Marek Kowalski is a Scientist in the Microsoft's Cognition team in Cambridge, where he works on HoloLens. He is also finalizing his PhD candidacy at the Warsaw University of Technology in Poland, advised by professor Wladyslaw Skarbek. Marek's dissertation is about robust methods for facial landmark localization (face alignment), his main research interests are in computer vision and machine learning applied to computer vision. In 2016 and 2017 Marek was an intern at Microsoft Research in Redmond, where he worked on 3D reconstruction for telepresence on Microsoft HoloLens (Holoportation). In the past he also worked on 3D reconstruction using multiple Kinect sensors and on face recognition. To see some of the projects Marek worked on, visit his [GitHub page.](https:\/\/github.com\/MarekKowalski\/)"},{"image":"img\/speakers\/KHausman.jpg","description":"Karol Hausman is a Research Scientist at Google Brain in Mountain View, California working on robotics and machine learning. He is interested in enabling robots to autonomously acquire general-purpose skills with minimal supervision in real-world environments. His current research investigates interactive perception, deep reinforcement learning and imitation learning and their applications to robotics. He has evaluated his work on many different platforms including quadrotors, humanoid robots and robotic arms. He received his PhD in CS from the University of Southern California in 2018, MS from the Technical University Munich in 2013 and MEng from the Warsaw University of Technology in 2012. During his PhD, he did a number of internships at Bosch Research Center (2013 and 2014), NASA JPL (2015), Qualcomm Research (2016) and Google DeepMind (2017)."},{"image":"img\/speakers\/MTarkowski.JPG","description":"Mateusz Tarkowski is a senior data scientist at The Boston Consulting Group, where he develops advanced analytical tools to help tackle BCG clients' most pressing and difficult business problems. In his work, he has used techniques from machine learning and mathematical optimization to solve strategic and operational issues in the consumer goods sector. Mateusz received his Bachelor and Master\u2019s degrees in computer science from the University of Warsaw, and his DPhil (PhD) degree at the University of Oxford. His research focuses on applying methods from cooperative game theory to network science problems, such as network centrality and link prediction."}]},"sponsors":{"disabled":false,"joinText":"Are you interested in supporting \u201cPL in ML: Polish View on Machine Learning\u201d? ","contactText":"Contact our sponsorship officers","contactEmailAddress":"sponsors.plinml@mimuw.edu.pl","sections":["Strategic sponsor","Platinum sponsor","Gold sponsors","Silver sponsors","Bronze sponsors","Partners"],"list":[[{"image":"img\/partner-logos\/BCG.jpg","url":"https:\/\/www.bcg.com\/beyond-consulting\/bcg-gamma\/default.aspx"}],[{"image":"img\/partner-logos\/samsung-resize.png","url":"https:\/\/www.samsung.com\/"}],[{"image":"img\/partner-logos\/google_logo_resize.png","url":"https:\/\/www.google.com\/"},{"image":"img\/partner-logos\/tpx_logo_resized.png","url":"https:\/\/www.tooploox.com\/"},{"image":"img\/partner-logos\/TCL_logo_resize.png","url":"https:\/\/www.tcl.eu\/"},{"image":"img\/partner-logos\/allegro.png","url":"https:\/\/allegro.tech"},{"image":"img\/partner-logos\/amazon.png","url":"https:\/\/www.amazon.com"},{"image":"img\/partner-logos\/RTB.png","url":"https:\/\/www.rtbhouse.com\/pl\/"}],[{"image":"img\/partner-logos\/jane_street.jpg","url":"https:\/\/www.janestreet.com"}]]},"scientific_board":{"list":[{"name":"Jan Madey","avatar":"img\/scientific-board\/Jan_Madey.png","brief":"Jan Madey, M.Sc., Ph.D., D.Sc. Full professor of Computer Science at the Faculty of Mathematics, Informatics and Mechanics of the University of Warsaw, a past Vice-Rector at the University.","description":"Jan Madey, M.Sc., Ph.D., D.Sc. Full professor of Computer Science at the Faculty of Mathematics, Informatics and Mechanics of the University of Warsaw, a past Vice-Rector at the University. Member of the Polish General Committee of the Informatics Olympiad. Chairman of the Board of the Polish Children\u2019s Fund. President of EUNIS (European University Information Systems Organization) from 2009 until 2015. Author of over 120 papers, reports and books on programming languages, operating systems, software engineering and computer science education. He spent over 10 years at some of the leading educational institutions in Western Europe and North America. Many years of his cooperation with David Lorge Parnas have resulted in creation of a methodology sometimes referred to in literature as the Parnas-Madey Four-Variable Model. Member of the ACM, IEEE, the Society for Software Engineering, the Polish Mathematical Society and an Honorary Member of the Polish Information Processing Society. Since 1994 he has been the coach of the University of Warsaw teams for the ACM ICPC (International Collegiate Programming Contest). Currently, he shares coaching duties with Prof. Krzysztof Diks. The University of Warsaw teams regularly advance to the world finals and were crowned world champions at both the 2003 contest held in Beverly Hills, CA and the 2007 competition in Tokyo. Prof. Madey is also the National Organizer of the European Union Contest for Young Scientists."},{"name":"Jacek Tabor","avatar":"img\/scientific-board\/Jacek_Tabor.png","brief":"Jacek Tabor in his scientific work deals with broadly understood machine teaching, in particular with deep generative models. He is also a member of the GMUM group (gmum.net) aimed at popularization and development of machine learning methods in the Cracow.","description":"Jacek Tabor in his scientific work deals with broadly understood machine teaching, in particular with deep generative models. He is also a member of the GMUM group (gmum.net) aimed at popularization and development of machine learning methods in the Cracow."},{"name":"Krzysztof Geras","avatar":"img\/scientific-board\/Krzysztof_Geras.png","brief":"Krzysztof is an assistant professor at NYU. His main interests are in unsupervised learning with neural networks, model compression, transfer learning, evaluation of machine learning models and applications of these techniques to medical imaging. He previously did a postdoc at NYU with Kyunghyun Cho, a PhD at the University of Edinburgh with Charles Sutton and an MSc as a visiting student at the University of Edinburgh with Amos Storkey.","description":"Krzysztof is an assistant professor at NYU. His main interests are in unsupervised learning with neural networks, model compression, transfer learning, evaluation of machine learning models and applications of these techniques to medical imaging. He previously did a postdoc at NYU with Kyunghyun Cho, a PhD at the University of Edinburgh with Charles Sutton and an MSc as a visiting student at the University of Edinburgh with Amos Storkey. His BSc is from the University of Warsaw. He also did industrial internships in Microsoft Research (Redmond, working with Rich Caruana and Abdel-rahman Mohamed), Amazon (Berlin, Ralf Herbrich's group), Microsoft (Bellevue) and J.P. Morgan (London)."},{"name":"Krzysztof Choromanski","avatar":"img\/scientific-board\/Krzysztof_Choromanski.png","brief":"Krzysztof Choromanski is a research scientist at Google Brain Robotics Team in New York. He works on several topics in robotics and machine learning including: reinforcement learning, evolution strategies, structured random matrices (for such applications as scalable kernel methods and compact architectures for RL policies) as well as quasi-Monte Carlo methods.","description":"Krzysztof Choromanski is a research scientist at Google Brain Robotics Team in New York. He works on several topics in robotics and machine learning including: reinforcement learning, evolution strategies, structured random matrices (for such applications as scalable kernel methods and compact architectures for RL policies) as well as quasi-Monte Carlo methods. He obtained his Ph.D from Columbia University working on structural graph theory and Ramsey-type problems in combinatorics. He is also an adjunct assistant professor at Columbia University, where he teaches classes on machine learning and data mining."},{"name":"Henryk Michalewski","avatar":"img\/scientific-board\/Henryk_Michalewski.png","brief":"Henryk Michalewski obtained his PhD in Mathematics and Habilitation in Computer Science from the University of Warsaw. Henryk spent a semester in the Fields Institute, was a postdoc at the Ben Gurion University in Beer-Sheva and a visiting professor in the \u00c9cole normale sup\u00e9rieure de Lyon. He was working on topology, determinacy of games, logic and automata.","description":"Henryk Michalewski obtained his PhD in Mathematics and Habilitation in Computer Science from the University of Warsaw. Henryk spent a semester in the Fields Institute, was a postdoc at the Ben Gurion University in Beer-Sheva and a visiting professor in the \u00c9cole normale sup\u00e9rieure de Lyon. He was working on topology, determinacy of games, logic and automata. Then he turned his interests to more practical games and wrote two papers on Morpion Solitaire. Presenting these papers at the IJCAI conference in 2015 he met researchers from DeepMind and discovered the budding field of deep reinforcement learning. This resulted in a series of papers including Learning from memory of Atari 2600, Hierarchical Reinforcement Learning with Parameters, Distributed Deep Reinforcement Learning: Learn how to play Atari games in 21 minutes and Reinforcement Learning of Theorem Proving. "},{"name":"Piotr Mi\u0142o\u015b","avatar":"img\/scientific-board\/Piotr_Milos.png","brief":"Piotr Mi\u0142o\u015b is an Associate Professor at the Faculty of Mathematics, Mechanics and Computer Science of the University of Warsaw. He received his Ph.D. in probability theory. From 2016 he has developed interest in machine learning. Since then he collaborated with deepsense.ai on various research projects. His focus in on problems in reinforcement learning. These include developing new training algorithm (like hierarchical learning), applying reinforcement learning to real life problem and the so-called model based reinforcement learning.","description":"Piotr Mi\u0142o\u015b is an Associate Professor at the Faculty of Mathematics, Mechanics and Computer Science of the University of Warsaw. He received his Ph.D. in probability theory. From 2016 he has developed interest in machine learning. Since then he collaborated with deepsense.ai on various research projects. His focus in on problems in reinforcement learning. These include developing new training algorithm (like hierarchical learning), applying reinforcement learning to real life problem and the so-called model based reinforcement learning.\n"},{"name":"Marek Cygan","avatar":"img\/scientific-board\/Marek_Cygan.png","brief":"Marek Cygan was doing research on the theory of algorithms for many years. He did his scientific internships at University of Maryland, College Park and University in Lugano.Recently, however, he has switched to machine learning. In 2017, he co-founded a startup NoMagic.AI which focuses on AI for robotics.","description":"Marek Cygan was doing research on the theory of algorithms for many years. He did his scientific internships at University of Maryland, College Park and University in Lugano.Recently, however, he has switched to machine learning. In 2017, he co-founded a startup NoMagic.AI which focuses on AI for robotics. Apart from that, Marek was a competitive programmer. He won the gold medal in ACM International Collegiate Programming Contest in 2007.\n"},{"name":"Przemys\u0142aw Biecek","avatar":"img\/scientific-board\/Przemyslaw_Biecek.png","brief":"Przemys\u0142aw Biecek obtained his Ph.D. in Mathematical Statistics and MSc in Software Engineering at Wroclaw University of Science and Technology. He is currently working as an Associate Professor at the Faculty of Mathematics and Information Science, Warsaw University of Technology, and an Assistant Professor at the Faculty of Mathematics, Informatics and Mechanics, University of Warsaw. His research activities are mainly focused on high-throughput genetic profiling in oncology.","description":"Przemys\u0142aw Biecek obtained his Ph.D. in Mathematical Statistics and MSc in Software Engineering at Wroclaw University of Science and Technology. He is currently working as an Associate Professor at the Faculty of Mathematics and Information Science, Warsaw University of Technology, and an Assistant Professor at the Faculty of Mathematics, Informatics and Mechanics, University of Warsaw. His research activities are mainly focused on high-throughput genetic profiling in oncology. He is also interested in predictive modeling of large and complex data, evidence based education and medicine, data visualisation and model interpretability."},{"name":"Tomasz Trzci\u0144ski","avatar":"img\/scientific-board\/Tomasz_Trzcinski.png","brief":"Tomasz Trzci\u0144ski is an Assistant Professor in the Division of Computer Graphics in the Institute of Computer Science at Warsaw University of Technology. He obtained his Ph.D. in Computer Vision at \u00c9cole Polytechnique F\u00e9d\u00e9rale de Lausanne. He has (co)-authored several papers and serves as a reviewer in prestigious computer science conferences (CVPR, ECCV, NIPS) and journals (TPAMI, TIP, TMM, PRL). He worked at Google, Qualcomm Corporate R&D and Telef\u00f3nica R&D.","description":"Tomasz Trzci\u0144ski is an Assistant Professor in the Division of Computer Graphics in the Institute of Computer Science at Warsaw University of Technology. He obtained his Ph.D. in Computer Vision at \u00c9cole Polytechnique F\u00e9d\u00e9rale de Lausanne. He has (co)-authored several papers and serves as a reviewer in prestigious computer science conferences (CVPR, ECCV, NIPS) and journals (TPAMI, TIP, TMM, PRL). He worked at Google, Qualcomm Corporate R&D and Telef\u00f3nica R&D. He was appointed a Visiting Scholar at Stanford University and was named New Europe 100 Innovator. Since 2015, he holds a Chief Scientist position at Tooploox."},{"name":"Jan Chorowski","avatar":"img\/scientific-board\/Jan_Chorowski.png","brief":"Jan Chorowski is an Associate Professor at Faculty of Mathematics and Computer Science at Wroc\u0142aw University of Technology. He received his M.Sc. degree in electrical engineering from Wroc\u0142aw University of Technology and PhD from University of Louisville","description":"Jan Chorowski is an Associate Professor at Faculty of Mathematics and Computer Science at Wroc\u0142aw University of Technology. He received his M.Sc. degree in electrical engineering from Wroc\u0142aw University of Technology and PhD from University of Louisville. He has visited several research teams, including Google Brain, Microsoft Research and Yoshua Bengio\u2019s lab. His research interests are applications of neural networks to problems which are intuitive and easy for humans and difficult for machines, such as speech and natural language processing."}]},"social":{"show_header_links":true,"facebook":{"layout":"box_count","action":"like","size":"large","showFaces":true,"share":false},"links":[{"title":"PLinML on Facebook","url":"https:\/\/www.facebook.com\/PLinML\/","icon":"fab fa-facebook-f"},{"title":"PLinML on LinkedIn","url":"https:\/\/www.linkedin.com\/company\/plinml\/","icon":"fab fa-linkedin-in"},{"title":"#pinml","url":"https:\/\/twitter.com\/PL_in_ML","icon":"fab fa-twitter"},{"title":"PLinML on Youtube","url":"https:\/\/www.youtube.com\/channel\/UCmXKn-Xeq1ZTAQBTwsYw4AA","icon":"fab fa-youtube"},{"title":"PLinML by email","url":"mailto:contact.plinml@mimuw.edu.pl","icon":"far fa-envelope"}]}};
    console.warn("Page content was prefetched");
    window.preloadedContent = (Object.assign({}, data, {
        fetch_error: false,
        loaded: true
    }));
    const activeWaitLoad = () => {
        if(window.loadPrefetchedContent) {
            window.loadPrefetchedContent(window.preloadedContent);
        } else {
            setTimeout(activeWaitLoad, 250);
        }
    };
    activeWaitLoad();
};

preloadContent();

export default function init(document) {
    document.addEventListener('DOMContentLoaded', function() {
        try {
            if(AOS) {
                AOS.init();
            }
        } catch(e) {
            // Do nothing
        }
        Loader.load()
        ReactDOM.render(
            <AppRoot />,
            document.getElementsByTagName('render-root')[0]
        )
    })
};