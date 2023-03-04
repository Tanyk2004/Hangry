import pandas as pd

df = pd.read_excel('~/Documents/GitHub/Hangry/backend/venv/food_option_names.xlsx')
# print(df)
output = []
df = df.reset_index()
for index, row in df.iterrows():
    temp = row['Food']
    temp = temp[0].upper() + temp[1:]
    # print(temp)
    output.append(temp)
ndf = pd.DataFrame(output).T
ndf.to_excel(excel_writer = "~/Documents/Github/Hangry/backend/venv/result.xlsx")