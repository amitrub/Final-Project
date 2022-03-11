# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import ipaddress

def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.
    ips = ipaddress.IPv4Network('192.0.2.0/28')
    ips = ["192.168.1.{}".format(str(i)) for i in range(256)] + ["10.100.102.{}".format(str(i)) for i in range(256)]
    print(ips)
    print(type(ips))
    [str(ip) for ip in ipaddress.IPv4Network('192.0.2.0/28')]


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
