import requests
from bs4 import BeautifulSoup
import pandas as pd

url = 'https://www.fifaratings.com/teams'  
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

table = soup.find('table')  
rows = table.find_all('tr')

data = []
logos = []

for row in rows:
    cells = row.find_all('td')  
    if len(cells) > 1: 
        row_data = []  
        for cell in cells:

            cell_text = cell.text.strip()
            row_data.append(cell_text) 
            if cell.find('img'):
                if "  " in cell_text:
                    team_name = cell_text.split("  ")[0].lower().replace(" ", "-")  
                else:
                    team_name = cell_text.lower().replace(" ", "-")  
                logo_url = f"https://www.fifaratings.com/wp-content/uploads/{team_name}-300x300.png"  
                logos.append(logo_url)  
        data.append(row_data)  

df = pd.DataFrame(data, columns=["ID","Takım", "Overall", "Atak", "Ortasaha", "Defans"]) 
df[['Takım', 'Lig']] = df['Takım'].str.split('  ', n=1, expand=True)
df["Logo_URL"] = logos
df = df[['ID', 'Lig', 'Takım', 'Overall', 'Atak', 'Ortasaha', 'Defans', 'Logo_URL']]
df.to_excel("veriler.xlsx", index=False)  # index=False, veri çerçevesinin indekslerini Excel'e yazmaz
