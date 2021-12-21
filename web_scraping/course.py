
class Course():

    def __init__(self):
        self.name = None #
        self.program = None
        self.code = None #
        self.semester = None 
        self.period = None
        self.area = None 
        self.area_number = None
        self.points = None
        self.level = None
        self.block = None
        self.url = None
        self.other_information = None
        self.vof = None
        self.lab = False
        self.exam = False
        self.project = False
        self.upg = False
        self.ktr = False
        self.hem = False # essäuppgift (hemtenta (?))
        self.bas = False # obligatoriska seminarier
        self.more_periods = False


    def check_examination_type(self, examination_type):
        if ("DAT" in examination_type) or ("TEN" in examination_type):
            self.exam = True
        if ("UPG" in examination_type):
            self.upg = True
        if ("LAB" in examination_type):
            self.lab = True
        if ("KTR" in examination_type):
            self.ktr = True
        if ("HEM" in examination_type):
            self.hem = True
        if ("BAS" in examination_type):
            self.bas = True
        if ("PRA" in examination_type):
            self.project = True

    def set_vof(self, vof_in):
        if vof_in == "Obligatorisk/Valbar":
            self.vof = "O/V"
        elif vof_in == "Obligatorisk":
            self.vof = "O"
        elif vof_in == "Valbar":
            self.vof = "V"
        else:
            self.vof = "-"
    """
    def set_area(self, area):
        if "" == area:
            self.area = ""
        elif "aiochmaskin" in area:
            self.area = "AI och maskininlärning"
        elif "autonomasystem" in area:
            self.area = "Autonoma system"
        elif "datorsystem" in area:
            self.area = "Datorsystem"
        elif "elektronik" in area:
            self.area = "Elektronik"
        elif "industriellekonomi" in area:
            self.area = "Industriell Ekonomi"
        elif "internationalsoftware" in area:
            self.area = "International Software Engineering"
        elif "kommunikation" in area:
            self.area = "Kommunikation"
        elif "medicinskinformatik" in area:
            self.area = "Medicinsk informatik"
        elif "programmeringochalgoritmer" in area:
            self.area = "Programmering och algoritmer"
        elif "signal-ochbildbehandling" in area:
            self.area = "Signal- och bildbehandling"
        elif "spelprogrammering" in area:
            self.area = "Spelprogrammering"
        elif "storskaligmjukvaruutveckling" in area:
            self.area = "Storskalig mjukvaruutveckling"
        elif "system-on-chip" in area:
            self.area = "System-on-chip"
        elif "säkrasystem" in area:
            self.area = "Säkra system"
    """

    def set_points(self, hp_in):
        if "*" in hp_in:
            self.points = hp_in.replace('*', '')
            self.more_periods = True
        else:
            self.points = hp_in

    def reset(self):
        self.name = None
        self.program = None
        self.code = None
        self.points = None
        self.level = None
        self.block = None # fix when it's a "-" or when its a fraction # TODO
        self.url = None
        self.other_information = None
        self.vof = None
        self.lab = False
        self.exam = False
        self.project = False
        self.upg = False
        self.ktr = False
        self.hem = False # essäuppgift (hemtenta (?))
        self.bas = False # obligatoriska seminarier
        self.more_periods = False
