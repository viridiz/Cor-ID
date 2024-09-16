from datetime import datetime

def days_until_jan_first(chosen_date):
    jan_first_2024 = datetime(2024, 1, 1)
    diff = chosen_date - jan_first_2024
    return str(diff.days)

def transform_integer(n):
    if n < 1 or n > 99999:
        raise ValueError("This number must be between 1 and 99999 inclusive.")
    return str(n).zfill(5)

def to_base36(n_days, n_facility, n_patient):
    num = int(str(n_days) + str(n_facility) + str(n_patient))
    chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    result = []
    while num > 0:
        num, remainder = divmod(num, 36)
        result.append(chars[remainder])
    return ''.join(reversed(result))


def from_base36(corid):
    base36_str = corid[:-5]
    chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    num = 0
    for char in base36_str:
        num = num * 36 + chars.index(char)
    n_str = str(num)
    if len(n_str) < 11:
        raise ValueError("The number must be at least 11 digits long.")
    n_patient = n_str[-5:]
    n_facility = n_str[-10:-5]
    n_days = n_str[:-10]
    return {
        "n_days_since_first_jan_2024": int(n_days), 
        "n_facility": int(n_facility), 
        "n_patient": int(n_patient),
        "birth_year": int(corid[-5:-1]),
        "sex": corid[-1]
        }

