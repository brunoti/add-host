# Add Host (add-host)

A simple script to add an host to your /etc/hosts file!
Just because i think that is boring to aways open an editor just to add an single line on this file.

## Installing
``$ npm instal -g add-host``

## Usage
##### Basic usage:
``add-host -a alias [-i, --ip] [-c, --comment] [-h, --help]``

##### Example [1]: Add a host with default ip 127.0.0.1
``add-host -a dummy.dev``

##### Example [2]: Add a host setting all values
``add-host -i 192.168.1.1 -a dummy.dev -c "This is a dummy host"``

##### Example [3]: Getting some help
``add-host -h, add-host --help``

##### Available [options] are:
- ``-i, --ip`` OPTIONAL, default: 127.0.0.1 (Set host ip/address)
- ``-a, --alias`` (Set alias for host)
- ``-c, --comment`` OPTIONAL (Set comment for added host)
- ``-h, --help`` (See this beautyful description)

**It's perfect!**

## License
Add-Host is developed under MIT license.

## Contributing
Want to contribute? Great!

1. Fork it.
2. Create a branch ``(git checkout -b feature/new-feature)``
3. Commit your changes ``(git commit m "Added new feature")``
4. Push to the branch ``(git push origin feature/new-feature)``
5. Open a Pull Request
6. Enjoy a good progressive metal song and wait!
