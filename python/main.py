from utils import *
import os


os.system("clear")

# min_n = int("1" + "00001" + "00001") # 4LDSUJL
# max_n = int("36525" + "99999" + "99999") # 3LH24L9L33


chosen_date = datetime(2037, 4, 18)
n_days_since_first_jan_2024 = days_until_jan_first(chosen_date)
n_facility = transform_integer(343)
n_patient = transform_integer(1429)
birth_year_gender = "1984M"

corid = to_base36(n_days_since_first_jan_2024, n_facility, n_patient) + birth_year_gender
preimage = from_base36(corid)


print("Cor-ID is:", corid)
print("Preimage:", preimage)
