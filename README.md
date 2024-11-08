# PSCP Project

Don't reduce the size of your "DREAMS" just because of the word "LAZY".

### Projects Report

&emsp; Please sign-in with KMITL's Office 365 account to view our report : https://shorturl.asia/lJbdK

### Projects Link

&emsp; Link : [pscp-project-blue.vercel.app](https://pscp-project-blue.vercel.app)

### Fetures

<li>When entering the website, there will be a character selection system before accessing the main page.</li>
<li>Each character can be leveled up to 3 levels.</li>
<li>EXP points are collected, and when EXP reaches the specified level, the character's level will increase.</li>
<li>There is a timer for reading books and tracking break times.</li>
<li>The timer has both Auto and Custom systems where you can adjust the time manually.</li>
<li>Music is available to play while working to increase efficiency.</li>
<li>The music system can accept YouTube links.</li>
<li>There is a calendar system to show what needs to be done each day.</li>
<li>When resetting the timer, there will be a page showing the earned EXP, time, and level achieved.</li>

# Setup
## <b>Projects</b>
<b>Python 3.12.7 is recommended to run our project. Anything older may or may not work, try at your own risk!</b>
Start by cloning the repository

    git clone https://github.com/stangz14/PSCP_Project.git

Enter project directory

    cd PSCP_Project

Installation for Ubuntu 22.04 LTS with Python 3.12.7

    sudo add-apt-repository ppa:deadsnakes/ppa
    sudo apt install python3.12.7
    sudo apt-get install python3-dev
    sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin python3.12.7
Then select number that represent Python 3.12.7

## <b>Environments</b>
It's strongly recommended that you work under python virtual environment

Make sure you have <code>venv</code> installed.

&ensp; Windows

    pip install virtualenv
    
&ensp; MacOS

    pip3 install virtualenv

&ensp; Linux

    sudo apt-get install python3.12.7-venv
<br/>
<b>Creating virtual environment</b>

Windows

    python -m venv <virtual-environment-name>

macOS / Linux

    python3 -m venv <virtual-environment-name>

<br/>

<b>Activating virtual environment</b>

Windows Powershell

    Set-ExecutionPolicy RemoteSigned
    <virtual-environment-name>/Scripts/Activate.ps1

Windows Command Prompt

change directory into \<virtual-environment-name\>/Scripts/

    activate.bat

macOS / Linux

    source <virtual-environment-name>/bin/activate
<br/>

Now you're set to begin the next step<br />

## <b>Getting all the Requirements</b>

    pip install -r requirements.txt

## <b>Running the app</b>
*Accessible from all network interfaces

### <b>Windows</b>

### <b>For development</b>
    python main_dev.py

### <b>For production</b>
Powered by waitress

    python main_prod.py

### <b>macOS / Linux</b>

### <b>For development</b>
    python3 main_dev.py

### <b>For production</b>
Powered by waitress

    python3 main_prod.py
### <b>For mac user:</b>
if you encounter an address already in use error, please turn off the Airplay Reciever by open  
&emsp;System Setting --> Airdrop & Handoff --> AirPlay Reciever.
