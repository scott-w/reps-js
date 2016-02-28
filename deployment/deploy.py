from os.path import isfile
from subprocess import Popen


def update_app():
    Popen(['sudo', '-u www', 'git', 'pull'], cwd='/home/www/reps-js')
    Popen(
        ['sudo', '-u www', 'npm', 'i', '--no-progress'],
        cwd='/home/www/reps-js')
    Popen(
        ['sudo', '-u www', 'npm', 'run-script', 'compile'],
        cwd='/home/www/reps-js')


def check_upstart():
    return isfile('/etc/init/pumped.conf')


def restart_app():
    Popen(['sudo', 'service', 'pumped', 'restart'])


if __name__ == '__main__':
    update_app()

    if check_upstart():
        restart_app()
